import React, { useRef, useState, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

interface ZodiacModelProps {
  modelPath: string;
  position: [number, number, number];
  scale?: number;
  name: string;
  date: string;
}

export const ZodiacModel: React.FC<ZodiacModelProps> = ({
  modelPath,
  position,
  scale = 1.5,
  name,
  date
}) => {
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const gltf = useLoader(GLTFLoader, modelPath);

  const { modelScale } = useSpring<{ modelScale: [number, number, number] }>({
    modelScale: hovered ? [scale * 1.1, scale * 1.1, scale * 1.1] : [scale, scale, scale],
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useEffect(() => {
    if (gltf) {
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.01,
        clearcoat: 1,
        metalness: 0.6,
        transparent: true,
        opacity: 0.6,
        color: '#fffff',
        emissive: '#2d68d6',
        emissiveIntensity: 0.4,
      });

      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.material = glassMaterial;
        }
      });
    }
  }, [gltf]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <animated.group
        ref={modelRef}
        position={position}
        scale={modelScale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={gltf.scene} />
        <Billboard
          follow={true}
          lockX={false}
          lockY={false}
          lockZ={false}
          position={[0, 1.4, 0]}
        >
          <Text
            fontSize={0.14}
            anchorX="center"
            anchorY="middle"
          >
            {name}
          </Text>
          <Text
            fontSize={0.09}
            anchorX="center"
            anchorY="middle"
            position={[0, -0.2, 0]}
          >
            {date}
          </Text>
        </Billboard>
      </animated.group>
    </>
  );
};