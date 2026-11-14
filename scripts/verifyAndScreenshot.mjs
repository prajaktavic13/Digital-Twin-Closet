import { chromium } from 'playwright-core';

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--use-gl=angle', '--enable-webgl', '--ignore-gpu-blocklist', '--no-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.message);
  });

  console.log('1. Loading Dashboard...');
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 2200));

  // Screenshot 01: Dashboard with centered 3D avatar preview
  const dashCanvas = page.locator('canvas').first();
  await dashCanvas.scrollIntoViewIfNeeded();
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'docs/screenshots/01_dashboard.png' });
  console.log('✓ 01_dashboard.png saved');

  console.log('2. Loading Measurements View...');
  await page.click('button:has-text("Measurements")');
  await new Promise(r => setTimeout(r, 1200));

  // Screenshot 02: Measurements with full body avatar
  await page.screenshot({ path: 'docs/screenshots/02_measurements.png' });
  console.log('✓ 02_measurements.png saved');

  // Test Height slider maximum (205cm)
  console.log('Testing 205cm max height...');
  const heightSlider = page.locator('input[type="range"]').first();
  await heightSlider.fill('205');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'docs/screenshots/test_max_height_205cm.png' });

  // Test Height slider minimum (150cm)
  console.log('Testing 150cm min height...');
  await heightSlider.fill('150');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'docs/screenshots/test_min_height_150cm.png' });

  // Reset measurements to default
  await page.click('button:has-text("Reset Defaults")');
  await new Promise(r => setTimeout(r, 800));

  console.log('3. Loading Virtual Try-On Studio...');
  await page.click('button:has-text("Virtual Try-On")');
  await new Promise(r => setTimeout(r, 1500));

  // Screenshot 03: Try-On Studio default full-body front view
  await page.screenshot({ path: 'docs/screenshots/03_tryon_studio.png' });
  console.log('✓ 03_tryon_studio.png saved');

  // Test all presets
  const presets = [
    { label: 'Front', file: 'preset_front.png' },
    { label: 'Profile', file: 'preset_profile.png' },
    { label: 'Back', file: 'preset_back.png' },
    { label: 'Torso', file: 'preset_torso.png' },
    { label: 'Full Body', file: 'preset_full_body.png' }
  ];

  for (const p of presets) {
    console.log(`Testing preset ${p.label}...`);
    await page.click(`button:has-text("${p.label}")`);
    await new Promise(r => setTimeout(r, 900));
    await page.screenshot({ path: `docs/screenshots/${p.file}` });
  }

  // Return to Front preset
  await page.click('button:has-text("Front")');
  await new Promise(r => setTimeout(r, 800));

  // Test Randomize Look
  console.log('Testing Randomize Look...');
  await page.click('button:has-text("Randomize Look")');
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: 'docs/screenshots/test_randomized_look.png' });

  // Test Mannequin Mode toggle
  console.log('Testing Atelier Porcelain Finish...');
  await page.click('button[title*="Porcelain"]');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'docs/screenshots/test_porcelain_finish.png' });

  // Reset to default look
  await page.click('button:has-text("Reset Outfit")');
  await new Promise(r => setTimeout(r, 600));

  // Check catalogue page as well to ensure complete docs screenshots
  console.log('4. Checking Catalogue...');
  await page.click('button:has-text("Catalogue")');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'docs/screenshots/04_catalogue.png' });

  console.log('5. Checking Saved Outfits...');
  await page.click('button:has-text("Saved Outfits")');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'docs/screenshots/05_saved_outfits.png' });

  console.log('Error log count:', errors.length);
  if (errors.length > 0) {
    console.error('Console errors:', errors);
  }

  await browser.close();
  console.log('All verification tasks finished successfully.');
}

main().catch(console.error);
