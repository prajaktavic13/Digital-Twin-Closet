const fs = require('fs');
const path = require('path');

const products = [
  // T-shirts
  {
    id: 'p1',
    name: 'AURA Heavyweight Relaxed Tee',
    brand: 'ATELIER NORD',
    category: 'T-shirts',
    colorHex: '#ECE7DE',
    accentColor: '#D8D0C3',
    type: 'tshirt'
  },
  {
    id: 'p2',
    name: 'SOLIS Raw Edge Organic Tee',
    brand: 'ÉTOILE STUDIO',
    category: 'T-shirts',
    colorHex: '#3A393E',
    accentColor: '#28272C',
    type: 'tshirt'
  },
  // Shirts
  {
    id: 'p3',
    name: 'VERONA Crisp Poplin Overshirt',
    brand: 'ATELIER NORD',
    category: 'Shirts',
    colorHex: '#F6F3EE',
    accentColor: '#E2DBD0',
    type: 'shirt'
  },
  {
    id: 'p4',
    name: 'LUMEN Silk Minimalist Button-Down',
    brand: 'MAISON MODERNE',
    category: 'Shirts',
    colorHex: '#DFD2BE',
    accentColor: '#CBBBA3',
    type: 'shirt'
  },
  // Trousers
  {
    id: 'p5',
    name: 'TIBER Pleated Wide-Leg Trousers',
    brand: 'SARTORIAL LAB',
    category: 'Trousers',
    colorHex: '#9E866D',
    accentColor: '#846D56',
    type: 'trousers'
  },
  {
    id: 'p6',
    name: 'ORLO Cropped Tailored Pants',
    brand: 'ATELIER NORD',
    category: 'Trousers',
    colorHex: '#4E5346',
    accentColor: '#3B4034',
    type: 'trousers'
  },
  // Jeans
  {
    id: 'p7',
    name: 'KOBE Japanese Raw Denim Jeans',
    brand: 'DENIM ARCHIVE',
    category: 'Jeans',
    colorHex: '#253551',
    accentColor: '#172338',
    type: 'jeans'
  },
  {
    id: 'p8',
    name: 'KYOTO Relaxed Stonewash Denim',
    brand: 'DENIM ARCHIVE',
    category: 'Jeans',
    colorHex: '#7C93AE',
    accentColor: '#637A95',
    type: 'jeans'
  },
  // Jackets
  {
    id: 'p9',
    name: 'VALENTIN Wool Cashmere Overcoat',
    brand: 'MAISON MODERNE',
    category: 'Jackets',
    colorHex: '#B59475',
    accentColor: '#9A795B',
    type: 'overcoat'
  },
  {
    id: 'p10',
    name: 'NEXUS Minimalist Leather Bomber',
    brand: 'ÉTOILE STUDIO',
    category: 'Jackets',
    colorHex: '#242121',
    accentColor: '#151313',
    type: 'bomber'
  },
  {
    id: 'p11',
    name: 'MILAN Tailored Double-Breasted Blazer',
    brand: 'SARTORIAL LAB',
    category: 'Jackets',
    colorHex: '#232A39',
    accentColor: '#161B26',
    type: 'blazer'
  },
  // Dresses
  {
    id: 'p12',
    name: 'SERENA Bias-Cut Satin Slip Dress',
    brand: 'MAISON MODERNE',
    category: 'Dresses',
    colorHex: '#4D6B5A',
    accentColor: '#374F41',
    type: 'slipdress'
  },
  {
    id: 'p13',
    name: 'AURELIA Minimalist Ribbed Knit Dress',
    brand: 'ATELIER NORD',
    category: 'Dresses',
    colorHex: '#CBBBA3',
    accentColor: '#B2A086',
    type: 'knitdress'
  },
  // Shoes
  {
    id: 'p14',
    name: 'MONACO Low-Top Leather Sneakers',
    brand: 'STEP STUDIO',
    category: 'Shoes',
    colorHex: '#F2EFEB',
    accentColor: '#D3CCC1',
    type: 'sneakers'
  },
  {
    id: 'p15',
    name: 'VENEZIA Italian Suede Penny Loafers',
    brand: 'SARTORIAL LAB',
    category: 'Shoes',
    colorHex: '#523E2F',
    accentColor: '#3C2C20',
    type: 'loafers'
  },
  {
    id: 'p16',
    name: 'CHELSEA Lug-Sole Desert Boot',
    brand: 'STEP STUDIO',
    category: 'Shoes',
    colorHex: '#A39281',
    accentColor: '#877665',
    type: 'boots'
  }
];

function generateSilhouette(type, colorHex, accentColor) {
  switch (type) {
    case 'tshirt':
      return `
        <!-- T-Shirt Silhouette -->
        <path d="M140 110 L170 125 L230 125 L260 110 L285 155 L255 175 L245 155 L245 285 L155 285 L155 155 L145 175 L115 155 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2" />
        <!-- Collar -->
        <path d="M170 125 Q200 150 230 125" fill="none" stroke="${accentColor}" stroke-width="3" stroke-linecap="round"/>
        <!-- Sleeve stitching -->
        <path d="M145 175 L125 160" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="3,3"/>
        <path d="M255 175 L275 160" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="3,3"/>
        <!-- Hem stitching -->
        <line x1="155" y1="277" x2="245" y2="277" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.8"/>
      `;
    case 'shirt':
      return `
        <!-- Shirt Silhouette -->
        <path d="M135 112 L170 122 L230 122 L265 112 L290 160 L260 178 L250 155 L250 290 L150 290 L150 155 L140 178 L110 160 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2" />
        <!-- Collar flaps -->
        <polygon points="175,122 200,150 185,160 165,125" fill="${accentColor}" opacity="0.6"/>
        <polygon points="225,122 200,150 215,160 235,125" fill="${accentColor}" opacity="0.6"/>
        <!-- Placket & Buttons -->
        <line x1="200" y1="150" x2="200" y2="290" stroke="${accentColor}" stroke-width="2.5" />
        <circle cx="200" cy="170" r="3" fill="#FFF" stroke="${accentColor}" stroke-width="1"/>
        <circle cx="200" cy="205" r="3" fill="#FFF" stroke="${accentColor}" stroke-width="1"/>
        <circle cx="200" cy="240" r="3" fill="#FFF" stroke="${accentColor}" stroke-width="1"/>
        <circle cx="200" cy="275" r="3" fill="#FFF" stroke="${accentColor}" stroke-width="1"/>
        <!-- Pocket -->
        <rect x="162" y="170" width="24" height="28" rx="2" fill="none" stroke="${accentColor}" stroke-width="1.5" />
      `;
    case 'trousers':
      return `
        <!-- Tailored Trousers Silhouette -->
        <path d="M152 110 L248 110 L252 285 L215 285 L200 175 L185 285 L148 285 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2" />
        <!-- Waistband -->
        <line x1="152" y1="124" x2="248" y2="124" stroke="${accentColor}" stroke-width="2"/>
        <!-- Pleat lines -->
        <line x1="178" y1="126" x2="174" y2="280" stroke="${accentColor}" stroke-width="1.5" opacity="0.7"/>
        <line x1="222" y1="126" x2="226" y2="280" stroke="${accentColor}" stroke-width="1.5" opacity="0.7"/>
        <!-- Belt loops -->
        <line x1="168" y1="110" x2="168" y2="124" stroke="${accentColor}" stroke-width="2"/>
        <line x1="232" y1="110" x2="232" y2="124" stroke="${accentColor}" stroke-width="2"/>
      `;
    case 'jeans':
      return `
        <!-- Jeans Silhouette -->
        <path d="M150 110 L250 110 L255 288 L216 288 L200 170 L184 288 L145 288 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2" />
        <!-- Waistband -->
        <line x1="150" y1="126" x2="250" y2="126" stroke="#C4976A" stroke-width="2"/>
        <!-- Fly & Button -->
        <line x1="200" y1="126" x2="200" y2="160" stroke="#C4976A" stroke-width="2"/>
        <circle cx="200" cy="118" r="3.5" fill="#C4976A"/>
        <!-- Curved Jeans pockets -->
        <path d="M152 132 Q175 135 178 155" fill="none" stroke="#C4976A" stroke-width="1.5"/>
        <path d="M248 132 Q225 135 222 155" fill="none" stroke="#C4976A" stroke-width="1.5"/>
        <!-- Subtle distress wash highlight -->
        <ellipse cx="178" cy="205" rx="10" ry="25" fill="#FFF" opacity="0.12"/>
        <ellipse cx="222" cy="205" rx="10" ry="25" fill="#FFF" opacity="0.12"/>
      `;
    case 'overcoat':
      return `
        <!-- Overcoat Silhouette -->
        <path d="M130 95 L170 108 L230 108 L270 95 L295 180 L265 190 L260 300 L140 300 L135 190 L105 180 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2" />
        <!-- Wide Lapels -->
        <polygon points="170,108 200,180 180,185 145,130" fill="${accentColor}" opacity="0.7"/>
        <polygon points="230,108 200,180 220,185 255,130" fill="${accentColor}" opacity="0.7"/>
        <!-- Overcoat Split / Buttons -->
        <line x1="200" y1="180" x2="200" y2="300" stroke="${accentColor}" stroke-width="2.5"/>
        <circle cx="208" cy="200" r="4" fill="${accentColor}"/>
        <circle cx="208" cy="235" r="4" fill="${accentColor}"/>
        <circle cx="208" cy="270" r="4" fill="${accentColor}"/>
        <!-- Welt pockets -->
        <rect x="145" y="225" width="30" height="5" rx="1" fill="${accentColor}" opacity="0.8"/>
        <rect x="225" y="225" width="30" height="5" rx="1" fill="${accentColor}" opacity="0.8"/>
      `;
    case 'bomber':
      return `
        <!-- Bomber Jacket Silhouette -->
        <path d="M130 110 L165 125 L235 125 L270 110 L292 180 L260 192 L250 270 L150 270 L140 192 L108 180 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2" />
        <!-- Ribbed Collar -->
        <path d="M165 125 Q200 142 235 125" fill="none" stroke="${accentColor}" stroke-width="6" stroke-linecap="round"/>
        <!-- Metal zipper -->
        <line x1="200" y1="135" x2="200" y2="270" stroke="#C4976A" stroke-width="2.5"/>
        <!-- Ribbed hem -->
        <rect x="150" y="260" width="100" height="10" fill="${accentColor}" opacity="0.8"/>
        <!-- Slanted pockets -->
        <line x1="160" y1="210" x2="175" y2="235" stroke="${accentColor}" stroke-width="2.5"/>
        <line x1="240" y1="210" x2="225" y2="235" stroke="${accentColor}" stroke-width="2.5"/>
      `;
    case 'blazer':
      return `
        <!-- Blazer Silhouette -->
        <path d="M130 102 L168 116 L232 116 L270 102 L290 185 L260 195 L252 285 L148 285 L140 195 L110 185 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2" />
        <!-- Peaked Lapels -->
        <polygon points="168,116 205,175 185,185 140,132" fill="${accentColor}" opacity="0.75"/>
        <polygon points="232,116 195,175 215,185 260,132" fill="${accentColor}" opacity="0.75"/>
        <!-- Double Breasted Buttons -->
        <circle cx="190" cy="195" r="3.5" fill="#C4976A"/>
        <circle cx="210" cy="195" r="3.5" fill="#C4976A"/>
        <circle cx="190" cy="225" r="3.5" fill="#C4976A"/>
        <circle cx="210" cy="225" r="3.5" fill="#C4976A"/>
        <!-- Flap Pockets -->
        <rect x="148" y="235" width="28" height="6" fill="${accentColor}"/>
        <rect x="224" y="235" width="28" height="6" fill="${accentColor}"/>
      `;
    case 'slipdress':
      return `
        <!-- Slip Dress Silhouette -->
        <!-- Thin Straps -->
        <line x1="175" y1="90" x2="175" y2="120" stroke="${accentColor}" stroke-width="2"/>
        <line x1="225" y1="90" x2="225" y2="120" stroke="${accentColor}" stroke-width="2"/>
        <!-- Flowing Dress Body -->
        <path d="M165 120 L235 120 L240 160 Q245 200 235 230 L260 300 L140 300 L165 230 Q155 200 160 160 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2" />
        <!-- Soft Draped Neckline -->
        <path d="M165 120 Q200 145 235 120" fill="none" stroke="${accentColor}" stroke-width="1.5"/>
        <!-- Subtle Satin Sheen Wave -->
        <path d="M185 150 Q205 210 195 285" fill="none" stroke="#FFF" stroke-width="4" opacity="0.15"/>
      `;
    case 'knitdress':
      return `
        <!-- Ribbed Knit Dress Silhouette -->
        <path d="M160 100 L240 100 L245 130 L275 165 L255 178 L240 155 L242 220 Q245 250 238 300 L162 300 Q155 250 158 220 L160 155 L145 178 L125 165 L155 130 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2" />
        <!-- Mockneck collar -->
        <rect x="180" y="92" width="40" height="12" rx="2" fill="${accentColor}" opacity="0.8"/>
        <!-- Ribbed vertical lines -->
        <line x1="185" y1="110" x2="185" y2="295" stroke="${accentColor}" stroke-width="1" stroke-dasharray="2,2" opacity="0.6"/>
        <line x1="200" y1="110" x2="200" y2="295" stroke="${accentColor}" stroke-width="1" stroke-dasharray="2,2" opacity="0.6"/>
        <line x1="215" y1="110" x2="215" y2="295" stroke="${accentColor}" stroke-width="1" stroke-dasharray="2,2" opacity="0.6"/>
      `;
    case 'sneakers':
      return `
        <!-- Sneakers Silhouette -->
        <g transform="translate(10, 40)">
          <!-- Sole -->
          <path d="M100 220 C100 220 120 225 240 225 C275 225 295 215 300 205 L300 228 C290 236 260 240 220 240 L110 240 C95 240 92 228 100 220 Z" fill="#E2DDD5" stroke="${accentColor}" stroke-width="2"/>
          <!-- Upper -->
          <path d="M105 218 C115 190 145 180 180 180 L210 160 C230 160 245 180 270 190 C290 198 298 205 298 208 L105 218 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2"/>
          <!-- Laces & Tongue -->
          <line x1="195" y1="175" x2="215" y2="185" stroke="${accentColor}" stroke-width="2"/>
          <line x1="202" y1="183" x2="222" y2="193" stroke="${accentColor}" stroke-width="2"/>
          <line x1="209" y1="191" x2="229" y2="201" stroke="${accentColor}" stroke-width="2"/>
          <!-- Toe box curve -->
          <path d="M255 195 C275 200 288 208 288 212" fill="none" stroke="${accentColor}" stroke-width="1.5"/>
        </g>
      `;
    case 'loafers':
      return `
        <!-- Loafers Silhouette -->
        <g transform="translate(10, 40)">
          <!-- Heel & Sole -->
          <path d="M100 215 L100 235 L135 235 L135 225 L245 225 C280 225 295 215 300 205 L300 220 C290 228 260 232 220 232 L100 232 Z" fill="#2C2018" stroke="${accentColor}" stroke-width="2"/>
          <!-- Upper -->
          <path d="M102 215 C110 185 140 175 175 175 C210 175 240 180 275 195 C295 202 298 208 298 212 L102 215 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2"/>
          <!-- Penny Strap -->
          <rect x="180" y="176" width="30" height="16" rx="3" fill="${accentColor}" stroke="#1A120D" stroke-width="1.5"/>
          <ellipse cx="195" cy="184" rx="8" ry="2.5" fill="#1A120D"/>
        </g>
      `;
    case 'boots':
      return `
        <!-- Chelsea Desert Boot Silhouette -->
        <g transform="translate(10, 20)">
          <!-- Lug Sole -->
          <path d="M110 230 L110 250 L145 250 L145 240 L250 240 C280 240 295 230 300 220 L300 235 C290 245 260 248 220 248 L110 248 Z" fill="#4A3F35" stroke="${accentColor}" stroke-width="2"/>
          <!-- Boot Shaft & Upper -->
          <path d="M140 120 L195 120 L200 175 C225 180 255 190 280 205 C295 212 298 222 298 226 L125 228 L140 120 Z" fill="${colorHex}" stroke="${accentColor}" stroke-width="2"/>
          <!-- Elastic Side Gusset -->
          <polygon points="160,125 182,125 186,175 156,175" fill="#3D3228" stroke="${accentColor}" stroke-width="1.5"/>
          <!-- Pull tab -->
          <rect x="145" y="110" width="8" height="15" rx="2" fill="#3D3228"/>
        </g>
      `;
  }
}

products.forEach(p => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="70%" stop-color="#F7F4EF" />
      <stop offset="100%" stop-color="#EBE5DC" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#1E1C1A" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Studio Background -->
  <rect width="400" height="400" fill="url(#bgGrad)" />
  
  <!-- Subtle atelier frame -->
  <rect x="16" y="16" width="368" height="368" fill="none" stroke="#E6DFD5" stroke-width="1" />

  <!-- Pedestal glow -->
  <ellipse cx="200" cy="330" rx="90" ry="14" fill="#1E1C1A" opacity="0.05" />

  <!-- Garment Graphic -->
  <g filter="url(#shadow)">
    ${generateSilhouette(p.type, p.colorHex, p.accentColor)}
  </g>

  <!-- Subtle Brand Watermark -->
  <text x="200" y="372" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="3" fill="#A8A196">${p.brand}</text>
</svg>`;

  fs.writeFileSync(path.join('public', 'products', `${p.id}.svg`), svg.trim());
});

console.log('Successfully generated 16 luxury product SVGs!');
