import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ZodiacModel from './ZodiacModel';

// 별자리 모델 경로 정의
const zodiacModels: Record<string, string> = {
  Aries: '/models/aries.glb',
  Taurus: '/models/taurus.glb',
  Gemini: '/models/gemini.glb',
  Cancer: '/models/cancer.glb',
  Leo: '/models/leo.glb',
  Virgo: '/models/virgo.glb',
  Libra: '/models/libra.glb',
  Scorpius: '/models/scorpius.glb',
  Sagittarius: '/models/sagittarius.glb',
  Capricornus: '/models/capricornus.glb',
  Aquarius: '/models/aquarius.glb',
  Pisces: '/models/pisces.glb'
};

const ModelView: React.FC = () => {
  const radius = 15; // 원형 배치 반경
  const zodiacEntries = useMemo(() => Object.entries(zodiacModels), []);

  return (
    <Canvas
      camera={{ position: [0, 1, 0], fov: 20 }} // 카메라 위치 조정
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
      <OrbitControls />
    </Canvas>
  );
};

export default React.memo(ModelView);