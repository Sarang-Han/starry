import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ZodiacCircle } from './ZodiacCircle';
import * as THREE from 'three';

interface SceneProps {
  ambientIntensity?: number;
  directionalIntensity?: number;
}

const Scene: React.FC<SceneProps> = ({
  ambientIntensity = 1,
  directionalIntensity = 8
}) => {
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        color="#e0f2ff"
        position={[0, 1, 0.2]}
        intensity={directionalIntensity}
        castShadow
      />
      <ZodiacCircle radius={15} />
      <OrbitControls
        target={[0, 0, 0]}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

const ModelView: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{
          position: [0, 1, 0],
          fov: 23,
          near: 0.1,
          far: 1000
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ModelView;