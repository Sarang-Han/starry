import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Billboard } from '@react-three/drei';
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

type ZodiacDates = {
  [key in keyof typeof zodiacModels]: string;
};

export const Dates: ZodiacDates = {
  Aries: '3/21 ~ 4/19',
  Taurus: '4/20 ~ 5/20',
  Gemini: '5/21 ~ 6/21',
  Cancer: '6/22 ~ 7/22',
  Leo: '7/23 ~ 8/22',
  Virgo: '8/23 ~ 9/22',
  Libra: '9/23 ~ 10/23',
  Scorpius: '10/24 ~ 11/21',
  Sagittarius: '11/22 ~ 12/21',
  Capricornus: '12/22 ~ 1/19',
  Aquarius: '1/20 ~ 2/18',
  Pisces: '2/19 ~ 3/20'
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
    <>
      <animated.group
        ref={modelRef}
        position={position}
        scale={modelScale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={gltf.scene} />
      </animated.group>
      <Billboard position={[position[0], position[1] + 1.8, position[2]]}>
        <Text
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {modelPath.split('/').pop()?.split('.')[0]}
          {'\n'}
          {Dates[modelPath.split('/').pop()?.split('.')[0] as keyof typeof Dates]}
        </Text>
      </Billboard>
    </>
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