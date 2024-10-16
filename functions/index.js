import functions from "firebase-functions";
import puppeteer from "puppeteer";
import fs from "fs";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "sealink-4b0fd.appspot.com",
});
const bucket = admin.storage().bucket();

export const pup = functions
  .runWith({
    memory: "1GB",
    timeoutSeconds: 120,
  })
  .https.onRequest(async (request, response) => {
    try {
      let browser, page;
      try {
        // 啟動 Puppeteer
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
        // 打開一個新頁面
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        functions.logger.info("New page created and viewport set");
      } catch (error) {
        functions.logger.error("Error creating a new page:", error);
        response.status(500).send("Error creating a new page");
        await browser.close();
        return;
      }

      try {
        await page.goto("https://www.google.com", {
          waitUntil: "networkidle0",
        });
        functions.logger.info("Page navigated to Google");
      } catch (error) {
        functions.logger.error("Error navigating to Google:", error);
        response.status(500).send("Error navigating to Google");
        await browser.close();
        return;
      }

      const filePath = "/tmp/screenshot.png";

      try {
        // 進行截圖並保存至本地
        await page.screenshot({ path: filePath, fullPage: true });
        functions.logger.info("Screenshot saved to", filePath);
      } catch (error) {
        functions.logger.error("Error taking screenshot:", error);
        response.status(500).send("Error taking screenshot");
        await browser.close();
        return;
      }

      try {
        // 關閉瀏覽器
        await browser.close();
        functions.logger.info("Browser closed successfully");
      } catch (error) {
        functions.logger.error("Error closing browser:", error);
      }

      let storageFileName, url;
      try {
        storageFileName = `screenshots/screenshot-${Date.now()}.png`;

        await bucket.upload(filePath, {
          destination: storageFileName,
          metadata: {
            contentType: "image/png",
          },
        });

        functions.logger.info("Screenshot uploaded to Firebase Storage");

        // 獲取上傳文件的公開 URL
        const file = bucket.file(storageFileName);
        [url] = await file.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });

        functions.logger.info("Generated signed URL:", url);
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
        // 返回圖片的下載 URL 給使用者
        response.status(200).send(`Screenshot URL: ${url}`);
        functions.logger.info("Screenshot URL sent to user");
      } catch (error) {
        functions.logger.error("Error sending screenshot URL to user:", error);
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
