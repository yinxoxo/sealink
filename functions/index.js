import functions from "firebase-functions";
import puppeteer from "puppeteer";
import fs from "fs";
import admin from "firebase-admin";

import cors from "cors";

const serviceAccount = {
  type: "service_account",
  project_id: "sealink-4b0fd",
  private_key_id: "e729c02f50e2655a3d457c2a252d39cdbfad87fa",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5a7mOZq6KdWzg\nKl6jPmrHRodIJBU8OiIDusbuqrdmgNK0SY9lEH/Sxk8st4gyxZg6vJdgfgIYvSHn\nbRioDg3jCkUwqN8i/gXKKD49Blj1MjAN6L4G5IkG5eKgJW0YW7aFnVnbyTIRLdl4\nwVUf1i1vcAs1jPUu0oroJSWEtTB6o34xr9B4UpsBGUl9KsXc4i3J5pUYBpPUVkeh\nYma4MEzJ0hQ9vDi3vGw0mAuaRPKBk1RiL9GtLkiiQCNmpf/KI0Rl+QUQXQqinoaa\ntGyLZVAPh1d4OjU0b2+ZlBkgeEMatUIQvrVUMLcfc5TMyfVvvqmWyBPjmITZlAka\niRSYQBELAgMBAAECggEAUnFq9j2Cos6WQ8+i95tzl7oswW9Fv9srL5RXClx+okVq\nKj5A01N0Oi/xmTTbipOf3ZHoDr/IR96kWgWAfoyNMSNqYznayPDAe0PMdI7Dc/ZG\nNpEDGQZ5RMdnLgSmDrwMmjk98ILzT38e4Fm58ydkWVWsrjlH9PMpTxHhLjHv5b7U\nbmEAjaUHNjPdrP0MqoDc+yQZyENVjQsssaBuh06Rqv7OBKiSsR0ozM7vAQI5vyy8\n/W7DWNvldWquelI7yl4msDqqD9dg7xk+PEqsAO1SmOZ7UHR+Q0C/qk4kFNC7sFIK\n32ewVFC+MxGguXGEOvEcjsk7etCCzt7Si9aXy6KC9QKBgQDvT+LzsDi/YQyy7O8J\n4Ll8I/nVTFF6cb6w2MCn0f1VElWm/Zbjtufl+5wRyUo+pfXoop8nlv7JE/J8QzAl\n0iBuEPx3KGDO536OwgEipMSt5zjCHyy85cRSe9WU4Jx+BiGRbxUbAaUQaiMcc6Yz\nfM4Uhqq1EiVnfVxlQjxX8PzvXwKBgQDGWcpycnlfjEpQna1jgwxwwnsUuGRQuZdb\nxkEY0t7aTqsmwed/cqm20+O1QZMNEcAPWx2oWtl5VUbL/1DPwCVNM+/7/rxD06tl\nqaoeXCVaZr5bcb/2wbiPdgwWbuoQQ8UH8wXa//5aL3Hva2OaezS5xNkpxZ7Mc+tD\n+UCV7Pd51QKBgQC7KCkAGBNpaMb7r90KRpwJgEFFFVirgAV4XSvek5WiUKJ35N96\n23LlJC/coSXVdQmqlHQQDEDalSURFaK0EW+XZOVtc0Cyz8zkbMlihKXks25qMuNU\nIAW31G0m77qzvKvIB63j3xdujPNErxWOMs8gsmkTD0v9cccu0exLgobt1QKBgAv4\nUTpU5DQ68CUrTtJpjy+i3PCkLBGfEZ5NOZJ470/3XWbKXuEXF1zcLqq6mVg5kQCc\nPA7z5Jno5ovbDZJsAxREpR/tAImLVZWeBpEseGibOLOmCrKmgC/QLOyRpvhyToqr\nRNgxiLUClfqf3XPuKYFoer6FmY63FCSW/ynNEiY9AoGBAKeuPWxia6gNJ6RFaMUO\nIFW8UDzNTO6DWXllQZokE3MuQswmD5upJCT4pdoP3EGWM3xhNqCj6SwcZ7Bdg6rK\nAtrJDkShcW125KdD2dduVHD/MciMsShTCmFIOB4S9Pm5bB1eotird4xmG6AEBpmk\n+4svs//ZHDCRU2S62vGORP6z\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-7tj2v@sealink-4b0fd.iam.gserviceaccount.com",
  client_id: "111590039936448003638",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7tj2v%40sealink-4b0fd.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
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
