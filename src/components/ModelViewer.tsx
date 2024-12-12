import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

// glb 파일 타입 확장
type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

const Model: React.FC = () => {
  const { scene } = useGLTF('/models/Virgo.glb') as unknown as GLTFResult;
  return <primitive object={scene} scale={1.5} />;
};

const ModelViewer: React.FC = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} />
    <Model />
    <OrbitControls enableZoom={true} />
  </Canvas>
);

export default ModelViewer;