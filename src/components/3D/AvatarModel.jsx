import React, { useMemo, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { createFabricTexture } from '../../utils/textureGenerator';
import { SKIN_TONES } from '../../data/defaultMeasurements';

export function AvatarModel({ outfit, fitProfile, skinTone = 'sand', avatarMode = 'avatar' }) {
  const { scene } = useGLTF('/models/avatar.glb');

  // Clone scene so multiple canvases (e.g. Dashboard preview and TryOn Studio) can render independently
  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(scene);
    // Deep clone materials
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });
    return clone;
  }, [scene]);

  const groupRef = useRef();

  // Find skin tone config
  const skinConfig = useMemo(() => {
    return SKIN_TONES.find(s => s.id === skinTone) || SKIN_TONES[2];
  }, [skinTone]);

  // Update materials and visibility whenever outfit or skin tone changes
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      // 1. TOP GARMENT
      if (child.name === 'Wolf3D_Outfit_Top') {
        const topItem = outfit.top || outfit.dress;
        if (topItem) {
          child.visible = true;
          const tex = createFabricTexture({
            textureType: topItem.textureType || 'solid',
            colorHex: topItem.colorHex || '#ECE7DE',
            secondaryColorHex: topItem.secondaryColorHex || '#DDD5C7'
          });

          if (child.material) {
            child.material.color = new THREE.Color(topItem.colorHex);
            child.material.map = tex;
            child.material.roughness = topItem.roughness !== undefined ? topItem.roughness : 0.7;
            child.material.metalness = topItem.metalness !== undefined ? topItem.metalness : 0.05;
            child.material.needsUpdate = true;
          }
        } else {
          // No top equipped - hide or show neutral minimal baselayer
          child.visible = false;
        }
      }

      // 2. BOTTOM GARMENT
      if (child.name === 'Wolf3D_Outfit_Bottom') {
        const bottomItem = outfit.bottom || outfit.dress;
        if (bottomItem) {
          child.visible = true;
          const tex = createFabricTexture({
            textureType: bottomItem.textureType || 'solid',
            colorHex: bottomItem.colorHex || '#9E866D',
            secondaryColorHex: bottomItem.secondaryColorHex || '#846D56'
          });

          if (child.material) {
            child.material.color = new THREE.Color(bottomItem.colorHex);
            child.material.map = tex;
            child.material.roughness = bottomItem.roughness !== undefined ? bottomItem.roughness : 0.75;
            child.material.metalness = bottomItem.metalness !== undefined ? bottomItem.metalness : 0.05;
            child.material.needsUpdate = true;
          }
        } else {
          child.visible = false;
        }
      }

      // 3. FOOTWEAR
      if (child.name === 'Wolf3D_Outfit_Footwear') {
        if (outfit.shoes) {
          child.visible = true;
          const tex = createFabricTexture({
            textureType: outfit.shoes.textureType || 'leather',
            colorHex: outfit.shoes.colorHex || '#F2EFEB',
            secondaryColorHex: outfit.shoes.secondaryColorHex || '#D3CCC1'
          });

          if (child.material) {
            child.material.color = new THREE.Color(outfit.shoes.colorHex);
            child.material.map = tex;
            child.material.roughness = outfit.shoes.roughness !== undefined ? outfit.shoes.roughness : 0.5;
            child.material.metalness = outfit.shoes.metalness !== undefined ? outfit.shoes.metalness : 0.1;
            child.material.needsUpdate = true;
          }
        } else {
          child.visible = false;
        }
      }

      // 4. SKIN & BODY
      if (child.name === 'Wolf3D_Body' || child.name === 'Wolf3D_Head') {
        if (child.material) {
          if (avatarMode === 'mannequin') {
            // Elegant Atelier Mannequin porcelain finish
            child.material.color = new THREE.Color('#F0ECE1');
            child.material.roughness = 0.2;
            child.material.metalness = 0.1;
            child.material.wireframe = false;
          } else {
            // Natural skin tone
            child.material.color = new THREE.Color(skinConfig.hex);
            child.material.roughness = skinConfig.roughness;
            child.material.metalness = 0.02;
          }
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, outfit, skinConfig, avatarMode]);

  // Apply measurements morphing by scaling bones and overall mesh with non-compounded hierarchy
  useEffect(() => {
    if (!clonedScene || !fitProfile?.scales) return;
    const { scales } = fitProfile;

    // 1. Overall model proportion:
    // scales.height scales the vertical axis (Y).
    // scales.weight applies a gentle, realistic volume factor to X and Z without distorting the mesh:
    if (groupRef.current) {
      const overallY = scales.height;
      const weightXZ = Math.pow(Math.max(0.6, scales.weight), 0.4);
      groupRef.current.scale.set(weightXZ, overallY, weightXZ);
    }

    // 2. Local bone adjustments:
    // Counter-scale child bones so parent spine scaling does NOT compound into chest, neck, or head.
    clonedScene.traverse((node) => {
      if (node.isBone) {
        if (node.name === 'Hips') {
          // Pelvis / Hips width: scales thighs and pelvis
          node.scale.set(scales.hips, 1, scales.hips);
        } else if (node.name === 'Spine') {
          // Counter-scale Spine so it does NOT inherit the Hips scale
          const counter = 1 / Math.max(0.01, scales.hips);
          node.scale.set(counter, 1, counter);
        } else if (node.name === 'Spine1') {
          // Waist region
          node.scale.set(scales.waist, 1, scales.waist);
        } else if (node.name === 'Spine2') {
          // Chest: cancel Spine1's waist scale so chest scale is exactly scales.chest
          const localChest = scales.chest / Math.max(0.01, scales.waist);
          node.scale.set(localChest, 1, localChest);
        } else if (node.name === 'Neck') {
          // Counter-scale chest so neck and head retain their natural proportions and never balloon
          const counter = 1 / Math.max(0.01, scales.chest);
          node.scale.set(counter, 1, counter);
        }
      }
    });
  }, [clonedScene, fitProfile]);

  return (
    <group ref={groupRef} position={[0, -0.95, 0]}>
      <primitive object={clonedScene} />

      {/* Layered Outerwear / Jacket Geometry when equipped */}
      {outfit.outerwear && (
        <OuterwearLayer outerwear={outfit.outerwear} fitProfile={fitProfile} />
      )}
    </group>
  );
}

// Custom 3D Layer for Outerwear / Jackets / Overcoats
function OuterwearLayer({ outerwear, fitProfile }) {
  const coatColor = outerwear.colorHex || '#B59475';
  const coatTexture = useMemo(() => {
    return createFabricTexture({
      textureType: outerwear.textureType || 'tweed',
      colorHex: coatColor,
      secondaryColorHex: outerwear.secondaryColorHex || '#9A795B'
    });
  }, [outerwear, coatColor]);

  const scales = fitProfile?.scales || { chest: 1, waist: 1, weight: 1 };
  const sX = scales.chest || 1;
  const sZ = scales.chest || 1;

  return (
    <group position={[0, 1.25, 0]} scale={[sX, 1, sZ]}>
      {/* Structured Coat / Blazer Torso Shell */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.65, 32, 1, true, -Math.PI * 0.42, Math.PI * 1.84]} />
        <meshStandardMaterial
          color={coatColor}
          map={coatTexture}
          roughness={outerwear.roughness || 0.75}
          metalness={outerwear.metalness || 0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left Lapel */}
      <mesh position={[-0.08, 0.06, 0.21]} rotation={[0.08, 0.25, -0.15]} castShadow>
        <boxGeometry args={[0.07, 0.38, 0.02]} />
        <meshStandardMaterial
          color={coatColor}
          map={coatTexture}
          roughness={outerwear.roughness || 0.75}
          metalness={outerwear.metalness || 0.05}
        />
      </mesh>

      {/* Right Lapel */}
      <mesh position={[0.08, 0.06, 0.21]} rotation={[0.08, -0.25, 0.15]} castShadow>
        <boxGeometry args={[0.07, 0.38, 0.02]} />
        <meshStandardMaterial
          color={coatColor}
          map={coatTexture}
          roughness={outerwear.roughness || 0.75}
          metalness={outerwear.metalness || 0.05}
        />
      </mesh>

      {/* Left Shoulder Pad & Upper Arm */}
      <mesh position={[-0.23, 0.20, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.065, 0.18, 8, 16]} />
        <meshStandardMaterial
          color={coatColor}
          map={coatTexture}
          roughness={outerwear.roughness || 0.75}
          metalness={outerwear.metalness || 0.05}
        />
      </mesh>

      {/* Right Shoulder Pad & Upper Arm */}
      <mesh position={[0.23, 0.20, 0]} rotation={[0, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.065, 0.18, 8, 16]} />
        <meshStandardMaterial
          color={coatColor}
          map={coatTexture}
          roughness={outerwear.roughness || 0.75}
          metalness={outerwear.metalness || 0.05}
        />
      </mesh>

      {/* Overcoat Lower Flared Hem for Overcoats */}
      {outerwear.category === 'Jackets' && outerwear.name.includes('Overcoat') && (
        <mesh position={[0, -0.52, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.30, 0.45, 32, 1, true, -Math.PI * 0.42, Math.PI * 1.84]} />
          <meshStandardMaterial
            color={coatColor}
            map={coatTexture}
            roughness={outerwear.roughness || 0.75}
            metalness={outerwear.metalness || 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload('/models/avatar.glb');
