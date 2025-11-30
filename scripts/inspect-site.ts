import { chromium } from 'playwright';
import * as fs from 'fs';

async function inspectSite() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Navigate to local site
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations
    
    // Take screenshot
    const screenshotPath = './current-homepage.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);
    
    // Get computed styles for key elements
    const styles = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      
      const marketingPage = document.querySelector('.marketing-page');
      const marketingComputed = marketingPage ? window.getComputedStyle(marketingPage) : null;
      
      const hero = document.querySelector('.marketing-hero');
      const heroComputed = hero ? window.getComputedStyle(hero) : null;
      
      const primaryButton = document.querySelector('.bg-primary');
      const buttonComputed = primaryButton ? window.getComputedStyle(primaryButton) : null;
      
      return {
        body: {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
        },
        marketingPage: marketingComputed ? {
          backgroundColor: marketingComputed.backgroundColor,
          backgroundImage: marketingComputed.backgroundImage,
          minHeight: marketingComputed.minHeight,
          padding: marketingComputed.padding,
        } : null,
        hero: heroComputed ? {
          padding: heroComputed.padding,
          textAlign: heroComputed.textAlign,
          maxWidth: heroComputed.maxWidth,
        } : null,
        button: buttonComputed ? {
          backgroundColor: buttonComputed.backgroundColor,
          color: buttonComputed.color,
          borderRadius: buttonComputed.borderRadius,
        } : null,
        cssVariables: {
          primary: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
          background: getComputedStyle(document.documentElement).getPropertyValue('--background'),
          foreground: getComputedStyle(document.documentElement).getPropertyValue('--foreground'),
        },
      };
    });
    
    console.log('\n=== COMPUTED STYLES ===');
    console.log(JSON.stringify(styles, null, 2));
    
    // Check which CSS files are loaded
    const loadedStylesheets = await page.evaluate(() => {
      return Array.from(document.styleSheets).map((sheet) => {
        try {
          return (sheet.ownerNode as HTMLLinkElement)?.href || 'inline';
        } catch {
          return 'cross-origin';
        }
      });
    });
    
    console.log('\n=== LOADED STYLESHEETS ===');
    loadedStylesheets.forEach((href, i) => console.log(`${i + 1}. ${href}`));
    
    // Check if Tailwind utilities are working
    const tailwindCheck = await page.evaluate(() => {
      const testDiv = document.createElement('div');
      testDiv.className = 'bg-primary text-primary-foreground';
      document.body.appendChild(testDiv);
      const computed = window.getComputedStyle(testDiv);
      document.body.removeChild(testDiv);
      return {
        bgPrimary: computed.backgroundColor,
        textPrimaryForeground: computed.color,
      };
    });
    
    console.log('\n=== TAILWIND UTILITIES TEST ===');
    console.log(JSON.stringify(tailwindCheck, null, 2));
    
  } catch (error) {
    console.error('Error inspecting site:', error);
  } finally {
    await browser.close();
  }
}

inspectSite().catch(console.error);

