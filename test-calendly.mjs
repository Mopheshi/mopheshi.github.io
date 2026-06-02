import { chromium } from "playwright";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:5173/");
  await page.waitForLoadState("networkidle");
  // click projects
  await page.click("text=Projects");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);
  // click Home
  let errorCaught = false;
  page.on("pageerror", err => { errorCaught = true; console.error(err); });
  await page.click("text=Home");
  await page.waitForTimeout(2000);
  const isApp = await page.isVisible("text=Hello, I'm Ndachimya,");
  console.log("Is Home App rendered?", isApp);
  console.log("Did error occur?", errorCaught);
  await browser.close();
})();
