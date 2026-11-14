import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const recordingsDir = path.resolve('docs/recordings');
fs.mkdirSync(recordingsDir, { recursive: true });

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Smooth mouse move helper
async function smoothMove(page, x, y, steps = 15) {
  await page.mouse.move(x, y, { steps });
  await sleep(100);
}

// Injected virtual mouse cursor
async function injectCursor(page) {
  await page.evaluate(() => {
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 22px;
      height: 22px;
      border: 2px solid #C4976A;
      background: rgba(196, 151, 106, 0.35);
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-50%, -50%);
      transition: width 0.15s, height 0.15s, background-color 0.15s;
      box-shadow: 0 0 10px rgba(196, 151, 106, 0.5);
    `;
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    window.addEventListener('mousedown', () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.backgroundColor = 'rgba(196, 151, 106, 0.7)';
    });

    window.addEventListener('mouseup', () => {
      cursor.style.width = '22px';
      cursor.style.height = '22px';
      cursor.style.backgroundColor = 'rgba(196, 151, 106, 0.35)';
    });
  });
}

(async () => {
  console.log('--- Starting Video Recording of Digital Twin Closet ---');

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: [
      '--use-gl=angle',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--no-sandbox',
      '--window-size=1280,720'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: recordingsDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await injectCursor(page);
  await sleep(1800);

  // ==========================================
  // SCENE 1: DASHBOARD
  // ==========================================
  console.log('Scene 1: Atelier Dashboard Walkthrough...');
  await smoothMove(page, 450, 180);
  await sleep(1000);

  // Move to stats cards
  await smoothMove(page, 320, 310);
  await sleep(600);
  await smoothMove(page, 540, 310);
  await sleep(600);
  await smoothMove(page, 760, 310);
  await sleep(600);

  // Rotate 3D avatar on mini canvas
  console.log('Interacting with 3D Avatar turntable on Dashboard...');
  await smoothMove(page, 480, 520);
  await page.mouse.down();
  await page.mouse.move(620, 510, { steps: 25 });
  await page.mouse.move(340, 530, { steps: 35 });
  await page.mouse.move(480, 520, { steps: 20 });
  await page.mouse.up();
  await sleep(1200);

  // Scroll down to recent items
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: 'smooth' }));
  await sleep(1200);
  await smoothMove(page, 400, 550);
  await sleep(800);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await sleep(800);

  // ==========================================
  // SCENE 2: BODY MEASUREMENTS
  // ==========================================
  console.log('Scene 2: Body Measurements & Biometric Morphing...');
  // Click Measurements in sidebar
  await page.click('button:has-text("Measurements")');
  await injectCursor(page);
  await sleep(1500);

  // Adjust Chest slider
  console.log('Adjusting Chest measurement slider...');
  await smoothMove(page, 400, 260);
  await sleep(400);

  // Click quick presets
  console.log('Testing Biometric Presets...');
  await page.click('button:has-text("Broad Architectural")');
  await sleep(1200);

  await page.click('button:has-text("Slender Runway")');
  await sleep(1200);

  await page.click('button:has-text("Athletic Standard")');
  await sleep(1200);

  // Test skin tone
  console.log('Customizing skin tone finish...');
  await page.click('button:has-text("Nordic Fair")');
  await sleep(800);
  await page.click('button:has-text("Warm Sand")');
  await sleep(1000);

  // Highlight Fit Profile
  await smoothMove(page, 950, 480);
  await sleep(1200);

  // ==========================================
  // SCENE 3: VIRTUAL TRY-ON STUDIO
  // ==========================================
  console.log('Scene 3: 3D Virtual Try-On Studio (Core Feature)...');
  await page.click('button:has-text("Virtual Try-On")');
  await injectCursor(page);
  await sleep(1500);

  // Test Camera Angles
  console.log('Testing Camera Perspective Angles...');
  await page.click('button:has-text("Profile")');
  await sleep(1200);

  await page.click('button:has-text("Back")');
  await sleep(1200);

  await page.click('button:has-text("Torso")');
  await sleep(1200);

  await page.click('button:has-text("Full")');
  await sleep(1200);

  await page.click('button:has-text("Front")');
  await sleep(1000);

  // Turntable Auto-rotate
  console.log('Toggling Turntable rotation...');
  await page.click('button[title*="Turntable"]');
  await sleep(2500);
  await page.click('button[title*="Turntable"]');
  await sleep(600);

  // Fit Garments from Tray
  console.log('Fitting garments from categories...');
  await page.click('button:has-text("Tops & Shirts")');
  await sleep(600);
  const firstTop = await page.$('h4:has-text("VERONA")');
  if (firstTop) await firstTop.click();
  await sleep(1000);

  await page.click('button:has-text("Trousers & Jeans")');
  await sleep(600);
  const firstBottom = await page.$('h4:has-text("TIBER")');
  if (firstBottom) await firstBottom.click();
  await sleep(1000);

  await page.click('button:has-text("Jackets & Coats")');
  await sleep(600);
  const overcoat = await page.$('h4:has-text("VALENTIN")');
  if (overcoat) await overcoat.click();
  await sleep(1200);

  await page.click('button:has-text("Footwear")');
  await sleep(600);
  const sneakers = await page.$('h4:has-text("MONACO")');
  if (sneakers) await sneakers.click();
  await sleep(1200);

  // Test Randomize Look
  console.log('Testing Randomize Look...');
  await page.click('button:has-text("Randomize Look")');
  await sleep(1600);

  // Save Outfit Modal
  console.log('Saving Outfit combination...');
  await page.click('button:has-text("Save Outfit")');
  await sleep(800);
  await page.fill('input[placeholder*="Parisian"]', 'Nordic Atelier Ensemble');
  await page.fill('textarea', 'Tailored poplin shirt with virgin wool pleats and cashmere overcoat.');
  await sleep(800);
  await page.click('button:has-text("Save to Outfits")');
  await sleep(1500);

  // ==========================================
  // SCENE 4: CLOTHING CATALOGUE
  // ==========================================
  console.log('Scene 4: Demonstration Catalogue...');
  await page.click('button:has-text("Catalogue")');
  await injectCursor(page);
  await sleep(1400);

  // Filter Categories
  await page.click('button:has-text("Jackets")');
  await sleep(1000);
  await page.click('button:has-text("Jeans")');
  await sleep(1000);
  await page.click('button:has-text("All")');
  await sleep(800);

  // Search feature
  console.log('Testing search bar...');
  await page.fill('input[placeholder*="Search"]', 'Cashmere');
  await sleep(1200);

  // Open detail modal
  const card = await page.$('h4:has-text("VALENTIN")');
  if (card) {
    await card.click();
    await sleep(1500);
    // Close modal via Escape and button
    await page.keyboard.press('Escape');
    await sleep(600);
    const closeBtn = await page.$('div.fixed button');
    if (closeBtn) {
      try { await closeBtn.click(); } catch { /* ignore */ }
    }
    await sleep(800);
  }

  // Clear search
  await page.fill('input[placeholder*="Search"]', '');
  await sleep(800);

  // ==========================================
  // SCENE 5: MY CLOSET
  // ==========================================
  console.log('Scene 5: My Closet Gallery...');
  await page.click('button:has-text("My Closet")');
  await injectCursor(page);
  await sleep(1400);

  // Test Wear Now
  const wearNowBtn = await page.$('button:has-text("Wear Now")');
  if (wearNowBtn) {
    await wearNowBtn.click();
    await sleep(1200);
  }

  // ==========================================
  // SCENE 6: SAVED OUTFITS
  // ==========================================
  console.log('Scene 6: Saved Outfits Library...');
  await page.click('button:has-text("Saved Outfits")');
  await injectCursor(page);
  await sleep(1400);

  // Click "Equip on 3D Avatar" on the top outfit
  console.log('Equipping saved outfit on 3D Avatar...');
  const equipBtn = await page.$('button:has-text("Equip on 3D Avatar")');
  if (equipBtn) {
    await equipBtn.click();
    await sleep(2200);
  }

  // ==========================================
  // SCENE 7: RETURN TO DASHBOARD FINALE
  // ==========================================
  console.log('Scene 7: Finale Dashboard View...');
  await page.click('button:has-text("Dashboard")');
  await injectCursor(page);
  await sleep(2000);

  console.log('Recording complete. Closing browser context...');
  await page.close();
  await context.close();
  await browser.close();

  // Find generated webm video in recordingsDir
  const files = fs.readdirSync(recordingsDir).filter(f => f.endsWith('.webm'));
  if (files.length > 0) {
    const latestWebm = path.join(recordingsDir, files[files.length - 1]);
    const finalMp4 = path.join(recordingsDir, 'digital_twin_closet_demo.mp4');

    console.log(`Converting ${latestWebm} to MP4 using ffmpeg...`);
    try {
      execSync(`ffmpeg -y -i "${latestWebm}" -c:v libx264 -pix_fmt yuv420p -crf 20 -preset fast "${finalMp4}"`, {
        stdio: 'inherit'
      });
      console.log(`SUCCESS! High-quality MP4 video created at: ${finalMp4}`);
    } catch {
      console.log('ffmpeg conversion notice, raw webm is saved at:', latestWebm);
    }
  }

  console.log('--- Video Demonstration Recording Successfully Completed! ---');
})();
