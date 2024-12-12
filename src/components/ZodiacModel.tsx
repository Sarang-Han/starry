import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

interface ZodiacModelProps {
  modelPath: string;
  position: [number, number, number];
  scale?: number;
}

const ZodiacModel: React.FC<ZodiacModelProps> = ({ modelPath, position, scale = 1.5}) => {
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const gltf = useLoader(GLTFLoader, modelPath);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    roughness: 0.5,
    transmission: 0.9,
    thickness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    envMapIntensity: 1.4,
    metalness: 0.4,
    transparent: true,
    opacity: 0.65,
    color: '#c4b6eb',
    emissive: '#d6b7f5',
    emissiveIntensity: 0.1,
    attenuationColor: '#6f8cbd',
    attenuationDistance: 0.3,
  }), []);

  const { modelScale } = useSpring({
    modelScale: hovered ? scale * 1.1 : scale,
    config: { mass: 1, tension: 300, friction: 45 }
  });

  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.material = glassMaterial;
        }
      });
    }
  }, [gltf, glassMaterial]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <animated.group
      ref={modelRef}
      position={position}
      scale={modelScale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={gltf.scene} />
    </animated.group>
  );
};

export default React.memo(ZodiacModel);