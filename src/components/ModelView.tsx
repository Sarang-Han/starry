import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

const zodiacModels = {
  Aries: '/models/Aries.glb',
  Taurus: '/models/Taurus.glb',
  Gemini: '/models/Gemini.glb',
  Cancer: '/models/Cancer.glb',
  Leo: '/models/Leo.glb',
  Virgo: '/models/Virgo.glb',
  Libra: '/models/Libra.glb',
  Scorpius: '/models/Scorpius.glb',
  Sagittarius: '/models/Sagittarius.glb',
  Capricornus: '/models/Capricornus.glb',
  Aquarius: '/models/Aquarius.glb',
  Pisces: '/models/Pisces.glb'
} as const;

interface ZodiacModelProps {
  modelPath: string;
  position: [number, number, number];
  scale?: number;
}

const ZodiacModel: React.FC<ZodiacModelProps> = ({ modelPath, position, scale = 1.5 }) => {
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const gltf = useLoader(GLTFLoader, modelPath);

  const { modelScale } = useSpring({
    modelScale: hovered ? scale * 1.13 : scale,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useEffect(() => {
    if (gltf) {
      const glassMaterial = new THREE.MeshPhysicalMaterial({
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

const ModelView: React.FC = () => {
  const radius = 15; // 원형 배치 반경
  const zodiacEntries = Object.entries(zodiacModels);

  return (
    <Canvas
      camera={{ position: [0, 1, 0], fov: 23 }} // 카메라 위치 조정
    >
      <ambientLight intensity={4} />
      <directionalLight
        color="#81DAF5"
        position={[0, 10, 0]} 
        intensity={8}
        castShadow 
      />
      {zodiacEntries.map(([name, path], index) => {
        const angle = (index * 360) / zodiacEntries.length;
        const radian = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radian);
        const z = radius * Math.sin(radian);
        
        return (
          <ZodiacModel
            key={name}
            modelPath={path}
            position={[x, 0, z]}
          />
        );
      })}
      <OrbitControls 
        target={[0, 0, 0]} // 중앙을 타겟으로 설정
        enableZoom={true}
        enablePan={true}
        minPolarAngle={Math.PI / 2}   // 최소 폴라 각도를 수평으로 고정
        maxPolarAngle={Math.PI / 2} // 최대 폴라 각도
      />
    </Canvas>
  );
};

export default ModelView;