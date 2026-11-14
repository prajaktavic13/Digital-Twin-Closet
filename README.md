# ATELIER // Digital Twin Closet

A compact, polished, responsive web application demonstrating a **biometric digital wardrobe and real-time 3D virtual try-on concept**.

Built for academic demonstration and evaluated through an interactive 3–5 minute presentation. Runs 100% locally with zero external APIs, zero paid services, and offline persistence.

---

## ✦ System Architecture & Technical Implementation

To ensure clarity for academic evaluation, the technical mechanics of the application are designed as follows:

1. **3D Avatar Base Model**:
   - Uses a pre-existing openly licensed humanoid 3D model (`avatar.glb`).
   - Mounted on an interactive studio turntable pedestal with 360° orbital rotation, smooth camera presets, and zoom.
2. **Body Measurements & Approximate Visual Adjustments**:
   - Biometric inputs (**Height**, **Weight**, **Chest**, **Waist**, and **Hips**) produce approximate visual scale adjustments.
   - Non-compounding skeletal hierarchy scaling dynamically adjusts local bones (`Spine1` for waist, `Spine2` for chest, `Hips` for pelvic width, and root group scaling for height and mass) while counter-scaling the neck and spine so the head and torso maintain natural proportions.
   - Computes an approximate **Biometric Fit Profile** (BMI, recommended top/bottom sizes, and body shape classification).
3. **Garment Switching & 3D Materials**:
   - Virtual try-on utilizes the avatar's existing skinned 3D garment sub-meshes (`Wolf3D_Outfit_Top`, `Wolf3D_Outfit_Bottom`, `Wolf3D_Outfit_Footwear`).
   - Garment selection dynamically binds procedural fabric canvas textures (denim twill, knit, oxford poplin, satin, tweed, leather) and material physics properties (roughness, metalness, and color hex values).
   - Outerwear layers (such as overcoats and blazers) utilize procedural 3D geometry overlays anchored to the avatar's upper torso and shoulders.
   - *Note: This application does not implement physically accurate cloth or particle simulation; it uses real-time 3D material binding and procedural layering for demonstration stability.*
4. **Atelier Porcelain Finish (Mannequin Mode)**:
   - When toggled, the avatar skin material dynamically transitions to a minimalist, high-fashion porcelain ceramic glaze finish with subtle surface specular reflection, simulating a luxury atelier couture mannequin.
5. **Exclusive Slot-Based Garment Architecture**:
   - Strict outfit hierarchy enforcement:
     - Equipping a **Dress** automatically clears existing **Tops** and **Bottoms**.
     - Equipping a **Top** or **Bottom** automatically clears any active **Dress**.
     - **Footwear** and **Outerwear** remain independent layers.
   - Curated randomizer generates either coordinated Top + Bottom looks or Dress ensembles without conflicting pieces.
6. **Local Persistence**:
   - Wardrobe selections, custom body measurements, personal closet items, and saved outfit combinations persist locally via `localStorage`.

---

## ✦ Technology Stack

- **Framework**: React 19 + Vite
- **3D Graphics**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Styling**: Tailwind CSS v4 + Custom Atelier Design Tokens
- **Icons**: Lucide React
- **Code Splitting**: React `lazy` + `Suspense` for asynchronous route and view loading
- **State & Storage**: React Context API + LocalStorage Engine

---

## ✦ Demonstration Video & Presentation Guide

A complete, high-definition screen recording walking through all features is included in the repository:
- **Demonstration Video**: [`docs/recordings/digital_twin_closet_demo.mp4`](docs/recordings/digital_twin_closet_demo.mp4) (H.264 / 1280×720 / 65s walkthrough with pointer indicator, turntable interaction, slider deformation, garment fitting, catalogue filtering, and outfit equipping).
- **Presentation Script**: A step-by-step 3–5 minute script is provided in [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md) to guide live screen recordings and faculty evaluation.

### Keyframe Snapshots
- **Dashboard Overview**: [`docs/screenshots/01_dashboard.png`](docs/screenshots/01_dashboard.png)
- **Biometric Measurements**: [`docs/screenshots/02_measurements.png`](docs/screenshots/02_measurements.png)
- **3D Virtual Try-On Studio**: [`docs/screenshots/03_tryon_studio.png`](docs/screenshots/03_tryon_studio.png)
- **Clothing Catalogue**: [`docs/screenshots/04_catalogue.png`](docs/screenshots/04_catalogue.png)
- **Saved Outfits Library**: [`docs/screenshots/05_saved_outfits.png`](docs/screenshots/05_saved_outfits.png)

---

## ✦ Quick Start & Running Commands

### Prerequisites
- Node.js (version 18.x or newer, tested on Node v24)
- npm (version 9.x or newer)

### 1. Install Dependencies
```bash
npm install
```

### 2. Lint Check (0 errors, 0 warnings)
```bash
npm run lint
```

### 3. Production Build
```bash
npm run build
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### 5. Local Production Preview
```bash
npm run preview
```

---

## ✦ 16 Demonstration Garments

| ID | Name | Category | Brand | Color | Price |
|---|---|---|---|---|---|
| **p1** | AURA Heavyweight Relaxed Tee | T-shirts | ATELIER NORD | Ecru Sand | \$55 |
| **p2** | SOLIS Raw Edge Organic Tee | T-shirts | ÉTOILE STUDIO | Slate Charcoal | \$60 |
| **p3** | VERONA Crisp Poplin Overshirt | Shirts | ATELIER NORD | Warm Ivory | \$110 |
| **p4** | LUMEN Silk Minimalist Button-Down | Shirts | MAISON MODERNE | Champagne Silk | \$145 |
| **p5** | TIBER Pleated Wide-Leg Trousers | Trousers | SARTORIAL LAB | Camel Wool | \$135 |
| **p6** | ORLO Cropped Tailored Pants | Trousers | ATELIER NORD | Deep Olive | \$125 |
| **p7** | KOBE Japanese Raw Denim Jeans | Jeans | DENIM ARCHIVE | Deep Indigo | \$140 |
| **p8** | KYOTO Relaxed Stonewash Denim | Jeans | DENIM ARCHIVE | Stonewash Blue | \$130 |
| **p9** | VALENTIN Wool Cashmere Overcoat | Jackets | MAISON MODERNE | Oatmeal Camel | \$280 |
| **p10** | NEXUS Minimalist Leather Bomber | Jackets | ÉTOILE STUDIO | Espresso Black | \$260 |
| **p11** | MILAN Double-Breasted Blazer | Jackets | SARTORIAL LAB | Midnight Navy | \$220 |
| **p12** | SERENA Bias-Cut Satin Slip Dress | Dresses | MAISON MODERNE | Sage Emerald | \$175 |
| **p13** | AURELIA Ribbed Knit Dress | Dresses | ATELIER NORD | Sand Biscuit | \$165 |
| **p14** | MONACO Low-Top Leather Sneakers | Shoes | STEP STUDIO | Clean White / Gum | \$150 |
| **p15** | VENEZIA Italian Suede Loafers | Shoes | SARTORIAL LAB | Tobacco Suede | \$190 |
| **p16** | CHELSEA Lug-Sole Desert Boot | Shoes | STEP STUDIO | Taupe Sand | \$185 |
