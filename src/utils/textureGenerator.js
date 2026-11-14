import * as THREE from 'three';

const textureCache = new Map();

export function createFabricTexture({
  textureType = 'solid',
  colorHex = '#ECE7DE',
  secondaryColorHex = '#DDD5C7'
}) {
  const cacheKey = `${textureType}_${colorHex}_${secondaryColorHex}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base background
  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, 512, 512);

  switch (textureType) {
    case 'denim': {
      // Diagonal twill weave
      ctx.strokeStyle = secondaryColorHex;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.35;
      for (let i = -512; i < 1024; i += 6) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 512, 512);
        ctx.stroke();
      }
      // Vertical slub flecks
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 0.12;
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, 1.5, 4);
      }
      break;
    }

    case 'knit': {
      // Ribbed knit / waffle
      ctx.fillStyle = secondaryColorHex;
      ctx.globalAlpha = 0.22;
      for (let x = 0; x < 512; x += 8) {
        ctx.fillRect(x, 0, 3, 512);
      }
      ctx.globalAlpha = 0.15;
      for (let y = 0; y < 512; y += 8) {
        ctx.fillRect(0, y, 512, 2);
      }
      break;
    }

    case 'oxford': {
      // Crisp cross-hatch poplin
      ctx.strokeStyle = secondaryColorHex;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.25;
      for (let x = 0; x < 512; x += 4) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y < 512; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      break;
    }

    case 'pinstripe': {
      // Suiting pinstripes
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.35;
      for (let x = 0; x < 512; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      break;
    }

    case 'tweed': {
      // Wool tweed speckling & basket weave
      ctx.strokeStyle = secondaryColorHex;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < 512; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }
      ctx.fillStyle = '#000000';
      ctx.globalAlpha = 0.08;
      for (let i = 0; i < 1500; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, 2, 2);
      }
      break;
    }

    case 'leather':
    case 'suede': {
      // Organic micro pebble texture
      ctx.fillStyle = secondaryColorHex;
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.random() * 2 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'satin': {
      // Silk/Satin subtle luminous gradient band
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, 'rgba(255,255,255,0.08)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0.22)');
      grad.addColorStop(1, 'rgba(255,255,255,0.05)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
      break;
    }

    default:
      // Subtle organic noise for realism
      ctx.fillStyle = secondaryColorHex;
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < 800; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, 2, 2);
      }
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}
