export function calculateFitProfile(measurements) {
  const { height, weight, chest, waist, hips } = measurements;

  // BMI
  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);

  let bmiCategory = 'Balanced Proportion';
  if (bmi < 18.5) bmiCategory = 'Slender Fit';
  else if (bmi < 24.9) bmiCategory = 'Athletic / Normal';
  else if (bmi < 29.9) bmiCategory = 'Broad / Full Silhouette';
  else bmiCategory = 'Plus Silhouette';

  // Sizing determination
  let topSize = 'M';
  if (chest < 88) topSize = 'XS';
  else if (chest < 94) topSize = 'S';
  else if (chest < 102) topSize = 'M';
  else if (chest < 110) topSize = 'L';
  else if (chest < 118) topSize = 'XL';
  else topSize = 'XXL';

  let bottomSize = 'M';
  if (waist < 72) bottomSize = '28 / XS';
  else if (waist < 78) bottomSize = '30 / S';
  else if (waist < 86) bottomSize = '32 / M';
  else if (waist < 94) bottomSize = '34 / L';
  else if (waist < 102) bottomSize = '36 / XL';
  else bottomSize = '38 / XXL';

  // Body Silhouette shape
  let shape = 'Balanced Athletic';
  const chestWaistDiff = chest - waist;
  const hipsWaistDiff = hips - waist;

  if (chestWaistDiff > 18 && hipsWaistDiff < 14) {
    shape = 'Inverted Triangle (V-Taper)';
  } else if (Math.abs(chest - hips) < 6 && chestWaistDiff > 14) {
    shape = 'Hourglass Symmetry';
  } else if (chestWaistDiff <= 10 && hipsWaistDiff <= 10) {
    shape = 'Architectural Column / Rectangle';
  } else if (hipsWaistDiff > 16 && chestWaistDiff < 10) {
    shape = 'Pear / Lower Taper';
  }

  // 3D Model scaling multipliers
  // Baseline standard model is based on Height: 178cm, Chest: 96cm, Waist: 78cm, Hips: 98cm
  const scaleHeight = height / 178;
  const scaleChest = Math.max(0.75, Math.min(1.4, chest / 96));
  const scaleWaist = Math.max(0.75, Math.min(1.4, waist / 78));
  const scaleHips = Math.max(0.75, Math.min(1.4, hips / 98));
  const scaleWeight = Math.max(0.8, Math.min(1.3, 1 + ((weight - 68) / 100)));

  return {
    bmi,
    bmiCategory,
    topSize,
    bottomSize,
    shape,
    scales: {
      height: scaleHeight,
      chest: scaleChest,
      waist: scaleWaist,
      hips: scaleHips,
      weight: scaleWeight
    }
  };
}
