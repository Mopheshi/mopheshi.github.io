import { chromium } from "playwright";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:5173/projects");
  await page.waitForLoadState("networkidle");
  await page.click("text=About");
  await page.waitForTimeout(2000);
  console.log("Current URL:", page.url());
  const body = await page.innerHTML("body");
  console.log("Body length:", body.length);
  if (body.length < 500) console.log(body);
  await browser.close();
})();
