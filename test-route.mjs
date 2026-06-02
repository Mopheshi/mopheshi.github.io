import { chromium } from "playwright";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:5173/projects");
  await page.waitForLoadState("networkidle");
  await page.click("text=About");
  await page.waitForTimeout(2000);
  // Find which text is present to verify what rendered
  const isProjects = await page.isVisible("text=projects.");
  const isAbout = await page.isVisible("text=Hello, I'm Ndachimya,");
  console.log("Is Projects rendered?", isProjects);
  console.log("Is About/Home rendered?", isAbout);
  await browser.close();
})();
