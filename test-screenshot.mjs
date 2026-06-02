import { chromium } from "playwright";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:5173/projects");
  await page.waitForLoadState("networkidle");
  await page.click("text=About");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshot.png", fullPage: true });
  await browser.close();
})();
