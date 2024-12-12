import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// glb 파일 타입 확장
type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

const Model: React.FC = () => {
  const { scene } = useGLTF('/models/Virgo.glb') as unknown as GLTFResult;
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const { scale } = useSpring({
    scale: hovered ? 1.7 : 1.5,
    config: { mass: 1, tension: 280, friction: 60 }
  });
  
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Y축을 기준으로 천천히 회전
    }
  });

  return (
    <animated.group
      ref={modelRef} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />
    </animated.group>
  );
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