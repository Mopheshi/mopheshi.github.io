import { chromium } from "playwright";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:4173/");
  await page.waitForLoadState("networkidle");
  const hasDestroy = await page.evaluate(() => typeof window.Calendly.destroyBadgeWidget === "function");
  console.log("has destroyBadgeWidget?", hasDestroy);
  await browser.close();
})();
