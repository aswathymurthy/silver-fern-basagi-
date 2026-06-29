const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[BROWSER ERROR] Uncaught exception: ${err.message}`);
    console.log(err.stack);
  });

  try {
    console.log('Navigating to admin panel...');
    await page.goto('http://localhost:8000/');
    
    console.log('Waiting for load...');
    await page.waitForTimeout(2000);

    console.log('Clicking Basagi switch...');
    // The Basagi platform switch button
    await page.click('button:has-text("Basagi")');
    await page.waitForTimeout(1000);

    console.log('Clicking Gallery tab...');
    // The Gallery tab button
    await page.click('button:has-text("Gallery")');
    await page.waitForTimeout(2000);

    console.log('Done!');
  } catch (error) {
    console.error('Script error:', error);
  } finally {
    await browser.close();
  }
})();
