import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Calculates responsive camera framing based on canvas dimensions, aspect ratio, and avatar height
function getCameraConfigs(size, avatarHeight) {
  const aspect = size.width / Math.max(1, size.height);
  const aspectFactor = aspect < 1.0 ? Math.min(1.4, 1.0 / Math.max(0.65, aspect)) : 1.0;

  // Height adaptation: scale distance and target gently with user's height measurement (150cm - 205cm)
  const heightRatio = Math.max(0.95, (avatarHeight || 178) / 178);
  const heightDistanceScale = Math.pow(heightRatio, 0.65);
  const heightTargetOffset = (heightRatio - 1.0) * 0.22;

  const baseFullDistance = (size.height < 480 ? 3.85 : 3.75) * aspectFactor * heightDistanceScale;
  const wideFullDistance = (size.height < 480 ? 4.25 : 4.15) * aspectFactor * heightDistanceScale;
  const torsoDistance = 2.65 * (aspect < 0.9 ? 1.15 : 1.0) * heightDistanceScale;

  const targetY = -0.03 + heightTargetOffset;

  return {
    front: {
      pos: [0, 0.05 + heightTargetOffset, baseFullDistance],
      target: [0, targetY, 0]
    },
    side: {
      pos: [baseFullDistance, 0.05 + heightTargetOffset, 0],
      target: [0, targetY, 0]
    },
    back: {
      pos: [0, 0.05 + heightTargetOffset, -baseFullDistance],
      target: [0, targetY, 0]
    },
    closeup: {
      pos: [0, 0.16 + heightTargetOffset, torsoDistance],
      target: [0, 0.12 + heightTargetOffset, 0]
    },
    full: {
      pos: [0, 0.08 + heightTargetOffset, wideFullDistance],
      target: [0, targetY - 0.01, 0]
    }
  };
}

export function StudioCameraControls({
  preset = 'front',
  isAutoRotate = false,
  avatarHeight = 178
}) {
  const controlsRef = useRef();
  const { camera, scene, size } = useThree();

  const cameraConfigs = useMemo(() => {
    return getCameraConfigs(size, avatarHeight);
  }, [size, avatarHeight]);

  const targetPos = useRef(new THREE.Vector3(...cameraConfigs.front.pos));
  const targetLook = useRef(new THREE.Vector3(...cameraConfigs.front.target));
  const isTransitioning = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__ATELIER_3D__ = { camera, scene, controls: controlsRef.current };
    }
  }, [camera, scene]);

  useEffect(() => {
    const config = cameraConfigs[preset] || cameraConfigs.front;
    targetPos.current.set(...config.pos);
    targetLook.current.set(...config.target);
    isTransitioning.current = true;
  }, [preset, cameraConfigs]);

  useFrame((_, delta) => {
    if (controlsRef.current && isTransitioning.current) {
      camera.position.lerp(targetPos.current, Math.min(1, delta * 4));
      controlsRef.current.target.lerp(targetLook.current, Math.min(1, delta * 4));
      controlsRef.current.update();

      if (
        camera.position.distanceTo(targetPos.current) < 0.015 &&
        controlsRef.current.target.distanceTo(targetLook.current) < 0.015
      ) {
        camera.position.copy(targetPos.current);
        controlsRef.current.target.copy(targetLook.current);
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      onStart={() => {
        isTransitioning.current = false;
      }}
      enableDamping
      dampingFactor={0.06}
      minDistance={0.8}
      maxDistance={6.0}
      minPolarAngle={Math.PI * 0.15}
      maxPolarAngle={Math.PI * 0.52}
      autoRotate={isAutoRotate}
      autoRotateSpeed={1.8}
      makeDefault
    />
  );
}

export function StudioLighting({ mode = 'studio' }) {
  if (mode === 'warm') {
    return (
      <group>
        <ambientLight intensity={0.85} color="#FFF5EB" />
        <directionalLight
          position={[3, 5, 3]}
          intensity={1.8}
          color="#FFECD1"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 3, -2]} intensity={0.9} color="#FFE0B2" />
        <directionalLight position={[0, -2, 2]} intensity={0.3} color="#FFF0D4" />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#C4976A" />
      </group>
    );
  }

  if (mode === 'editorial') {
    return (
      <group>
        <ambientLight intensity={0.4} color="#F0F4F8" />
        <spotLight
          position={[0, 6, 2.5]}
          intensity={3.2}
          angle={0.6}
          penumbra={0.8}
          color="#FFFFFF"
          castShadow
        />
        <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#D6E4FF" />
        <pointLight position={[3, 1, -2]} intensity={0.8} color="#C4976A" />
      </group>
    );
  }

  // Default: Clean Minimal Studio
  return (
    <group>
      <ambientLight intensity={1.1} color="#FAF8F5" />
      <directionalLight
        position={[2.5, 4.5, 3.5]}
        intensity={1.5}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 3, 2]} intensity={0.8} color="#F3EFEA" />
      <directionalLight position={[0, 4, -3]} intensity={1.0} color="#FFFFFF" />
      <directionalLight position={[0, -1, 1]} intensity={0.3} color="#E8E2D9" />
    </group>
  );
}

export function TurntablePedestal() {
  return (
    <group position={[0, -0.96, 0]}>
      {/* Sleek studio pedestal */}
      <mesh receiveShadow position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.75, 0.8, 0.04, 64]} />
        <meshStandardMaterial
          color="#EDE7DF"
          roughness={0.4}
          metalness={0.08}
        />
      </mesh>

      {/* Subtle outer brass/champagne accent ring */}
      <mesh position={[0, -0.015, 0]}>
        <ringGeometry args={[0.74, 0.76, 64]} />
        <meshStandardMaterial
          color="#C4976A"
          roughness={0.25}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Soft Contact Shadows on ground */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.45}
        scale={2.2}
        blur={1.6}
        far={1.2}
        color="#2C2A29"
      />
    </group>
  );
}
