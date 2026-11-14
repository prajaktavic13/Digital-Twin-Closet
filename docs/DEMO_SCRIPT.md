# Digital Twin Closet — Screen Recording Demonstration Script (3–5 Minutes)

Use this script to guide your screen recording or live presentation for your academic evaluation. The flow covers every feature in a natural, logical sequence.

---

## ✦ Timing Breakdown

- **0:00 – 0:40**: Introduction & Dashboard Overview
- **0:40 – 1:35**: 3D Digital Twin Avatar & Biometric Measurements
- **1:35 – 2:45**: Real-Time 3D Virtual Try-On Studio (Core Feature)
- **2:45 – 3:30**: Clothing Catalogue & Smart Fit Sizing
- **3:30 – 4:15**: My Closet & Saved Outfits Management
- **4:15 – 4:45**: Conclusion & Local Architecture Summary

---

## ✦ Step-by-Step Walkthrough

### Part 1: Introduction & Dashboard (0:00 – 0:40)
1. **Screen**: Open browser at `http://localhost:5173/` on the **Dashboard** view.
2. **Talking Points**:
   > *"Hello everyone. Today I'm presenting **Digital Twin Closet**, a fashion-technology web application built with React, Three.js, React Three Fiber, and Tailwind CSS.*
   > *The objective of this project is to simulate a personalized digital wardrobe and real-time 3D virtual try-on experience that operates entirely client-side without external servers or paid APIs.*
   > *Here on the Dashboard, we have our luxury atelier interface showing our active digital twin, real-time wardrobe statistics—such as total closet pieces, saved outfits, estimated wardrobe valuation, and calibrated size—as well as currently fitted garments and recently selected pieces."*
3. **Action**: Drag the interactive 3D avatar on the mini-viewport to show 360° rotation.

---

### Part 2: Body Measurements & Dynamic Avatar Deformation (0:40 – 1:35)
1. **Screen**: Click on **"Measurements"** in the sidebar.
2. **Talking Points**:
   > *"A digital twin must reflect the user's authentic body proportions. In the Measurements module, we provide precise sliders for Height, Weight, Chest, Waist, and Hips.*
   > *Notice as I adjust the sliders, the 3D avatar dynamically deforms its bone structure and torso volume in real time.*
   > *For example, moving the Chest slider from 90cm to 110cm visibly expands the upper torso. Changing Height adjusts the limb proportions.*
   > *The system also computes our Biometric Fit Profile: calculating BMI, sizing recommendations (such as Size M or 32 waist), and body shape classification like Inverted Triangle or Balanced Athletic.*
   > *We can also test one-click presets like 'Slender Runway' or 'Broad Architectural', and adjust skin and mannequin finishes. All measurements are automatically persisted in localStorage."*
3. **Action**: Drag Chest and Height sliders, click the **"Broad Architectural"** preset, observe the avatar mesh update, and point out the updated size cards.

---

### Part 3: 3D Virtual Try-On Studio (1:35 – 2:45) — *Core Feature*
1. **Screen**: Click on **"Virtual Try-On"** in the sidebar.
2. **Talking Points**:
   > *"Now let's enter the heart of the project: the 3D Virtual Try-On Studio.*
   > *The avatar is mounted on a studio turntable pedestal with interactive studio lighting and shadow rendering.*
   > *We can switch perspective instantly using the camera angle presets: **Profile**, **Back**, **Torso close-up**, or **Full silhouette**, as well as toggle continuous turntable auto-rotation.*
   > *On the right, we have our slot-based garment manager: Top, Bottom, Outerwear, Footwear, and Dress.*
   > *When I choose a garment from the tray below—for example, this Crisp Poplin Overshirt or Japanese Raw Denim Jeans—the 3D engine immediately binds custom procedural textures and colors onto the avatar's corresponding skinned mesh.*
   > *We can also equip outerwear layers like this Wool Cashmere Overcoat, which realistically layers over the shirt.*
   > *Notice we can remove individual garments using the remove icon, hit 'Randomize Look' to generate cohesive ensembles, or save our favorite combination."*
3. **Action**:
   - Click camera buttons: **Profile**, **Back**, **Torso**, **Front**.
   - Equip a Top, a Bottom, and Shoes from the tray.
   - Click **"Randomize Look"** to demonstrate algorithmic styling.
   - Click **"Save Outfit"**, type `"College Demo Look"`, and click Save.

---

### Part 4: Clothing Catalogue & Sizing Recommendation (2:45 – 3:30)
1. **Screen**: Click on **"Catalogue"** in the sidebar.
2. **Talking Points**:
   > *"Next is our demonstration Clothing Catalogue featuring 16 curated luxury essentials across all 7 categories: T-shirts, Shirts, Trousers, Jeans, Jackets, Dresses, and Shoes.*
   > *We can filter by category pills or search in real time by name, fabric, or color.*
   > *Clicking on any product card opens the architectural detail modal.*
   > *Notice here the system pairs the garment with our active biometric twin measurements, displaying a personalized size recommendation and fit match percentage based on the user's calibrated chest and waist measurements.*
   > *From here, we can bookmark the piece into our personal closet or click 'Try On' to jump straight into the 3D studio."*
3. **Action**: Click the **"Jackets"** category pill, type `"Cashmere"` in search, open the product detail modal, point to the 98% Fit Match badge, and close.

---

### Part 5: My Closet & Saved Outfits (3:30 – 4:15)
1. **Screen**: Click on **"My Closet"**, then **"Saved Outfits"**.
2. **Talking Points**:
   > *"In 'My Closet', users view their curated collection of saved garments with total valuation metrics.*
   > *Clicking 'Wear Now' immediately equips that piece on the active digital twin.*
   > *In 'Saved Outfits', we see all saved multi-piece looks—including the 'College Demo Look' we just created, as well as presets like 'Sartorial Minimalist'.*
   > *Each card shows the breakdown of pieces, total cost, and a one-click 'Equip on 3D Avatar' button that re-assembles the complete look on the avatar."*
3. **Action**: Click **"Equip on 3D Avatar"** on a saved outfit to demonstrate instant look loading.

---

### Part 6: Conclusion (4:15 – 4:45)
1. **Screen**: Return to **Dashboard**.
2. **Talking Points**:
   > *"To conclude, Digital Twin Closet demonstrates how modern WebGL and 3D graphics in React can provide a responsive, privacy-friendly, and interactive fashion experience on any standard laptop without external backend dependencies.*
   > *Every button, slider, and navigation tab is fully functional, styled with a luxury minimalist aesthetic, and persisted locally.*
   > *Thank you, and I look forward to your questions."*
