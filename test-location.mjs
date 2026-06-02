import { chromium } from "playwright";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:5173/projects");
  await page.waitForLoadState("networkidle");
  await page.click("text=About");
  await page.waitForTimeout(1000);
  const pathname = await page.evaluate(() => window.location.pathname);
  const hash = await page.evaluate(() => window.location.hash);
  const url = await page.evaluate(() => window.location.href);
  console.log("pathname:", pathname);
  console.log("hash:", hash);
  console.log("url:", url);
  await browser.close();
})();
