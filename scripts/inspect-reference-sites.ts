import { chromium } from 'playwright';

async function inspectReferenceSites() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const sites = [
    { name: 'synthflow-marketing', url: 'https://synthflow-abgckysu.manus.space/' },
    { name: 'synthflow-dashboard', url: 'https://synthflow-abgckysu.manus.space/dashboard' },
  ];
  
  for (const site of sites) {
    try {
      console.log(`\n=== Inspecting ${site.name} ===`);
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      
      const screenshotPath = `./reference-${site.name}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved to ${screenshotPath}`);
      
      const styles = await page.evaluate(() => {
        const body = document.body;
        const computed = window.getComputedStyle(body);
        
        const hero = document.querySelector('h1, .hero, [class*="hero"]');
        const heroComputed = hero ? window.getComputedStyle(hero) : null;
        
        return {
          body: {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            fontFamily: computed.fontFamily,
          },
          hero: heroComputed ? {
            fontFamily: heroComputed.fontFamily,
            fontSize: heroComputed.fontSize,
            fontWeight: heroComputed.fontWeight,
            color: heroComputed.color,
          } : null,
          cssVariables: {
            // Try to get common CSS variables
            primary: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
          },
        };
      });
      
      console.log(JSON.stringify(styles, null, 2));
      
    } catch (error) {
      console.error(`Error inspecting ${site.name}:`, error);
    }
  }
  
  await browser.close();
}

inspectReferenceSites().catch(console.error);

