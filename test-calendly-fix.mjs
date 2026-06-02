import { chromium } from "playwright";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:5173/");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => {
    window.Calendly.destroyBadgeWidget();
    window.Calendly.initBadgeWidget({
      url: "https://calendly.com",
      text: "Book",
      color: "#000",
      textColor: "#fff"
    });
  });
  console.log("Re-init successful without manual remove");
  await browser.close();
})();
