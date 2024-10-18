import functions from "firebase-functions";
import puppeteer from "puppeteer";
import fs from "fs";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

import cors from "cors";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sealink-4b0fd.appspot.com",
});
const bucket = admin.storage().bucket();

const corsHandler = cors({ origin: true });

export const pup = functions
  .runWith({
    memory: "1GB",
    timeoutSeconds: 120,
  })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      const { url } = request.query;

      if (!url) {
        response.status(400).send("No URL provided");
        return;
      }

      try {
        let browser, page;
        try {
          browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          });
          functions.logger.info("Puppeteer launched successfully");
        } catch (error) {
          functions.logger.error("Error launching Puppeteer:", error);
          response.status(500).send("Error launching Puppeteer");
          return;
        }

        try {
          page = await browser.newPage();
          await page.setViewport({ width: 375, height: 812 });
          functions.logger.info("New page created and viewport set");
        } catch (error) {
          functions.logger.error("Error creating a new page:", error);
          response.status(500).send("Error creating a new page");
          await browser.close();
          return;
        }

        try {
          await page.goto(url, {
            waitUntil: "networkidle0",
            timeout: 120000,
          });
          functions.logger.info(`Page navigated to ${url}`);
        } catch (error) {
          functions.logger.error(`Error navigating to ${url}:`, error.message);
          response
            .status(500)
            .send(`Error navigating to ${url}: ${error.message}`);
          await browser.close();
          return;
        }

        const filePath = "/tmp/screenshot.png";

        try {
          await page.screenshot({ path: filePath, fullPage: true });
          functions.logger.info("Screenshot saved to", filePath);
        } catch (error) {
          functions.logger.error("Error taking screenshot:", error);
          response.status(500).send("Error taking screenshot");
          await browser.close();
          return;
        }

        try {
          await browser.close();
          functions.logger.info("Browser closed successfully");
        } catch (error) {
          functions.logger.error("Error closing browser:", error);
        }

        let storageFileName, storageUrl;
        try {
          storageFileName = `screenshots/screenshot-${Date.now()}.png`;

          await bucket.upload(filePath, {
            destination: storageFileName,
            metadata: {
              contentType: "image/png",
            },
          });

          functions.logger.info("Screenshot uploaded to Firebase Storage");

          const file = bucket.file(storageFileName);
          [storageUrl] = await file.getSignedUrl({
            action: "read",
            expires: "03-09-2491",
          });

          functions.logger.info("Generated signed URL:", storageUrl);
        } catch (error) {
          functions.logger.error(
            "Error uploading screenshot to Firebase Storage:",
            error,
          );
          response
            .status(500)
            .send("Error uploading screenshot to Firebase Storage");
          return;
        }

        try {
          response.status(200).json({ screenshotUrl: storageUrl });
          functions.logger.info("Screenshot URL sent to user");
        } catch (error) {
          functions.logger.error(
            "Error sending screenshot URL to user:",
            error,
          );
          response.status(500).send("Error sending screenshot URL to user");
        }

        try {
          fs.unlinkSync(filePath);
          functions.logger.info("Temporary file deleted");
        } catch (error) {
          functions.logger.error("Error deleting temporary file:", error);
        }
      } catch (error) {
        functions.logger.error("Unexpected error:", error.stack);
        response.status(500).send("Unexpected error");
      }
    });
  });
