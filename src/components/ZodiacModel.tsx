import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Text, Billboard, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import { Cache } from 'three';

// 최상위에 캐시 활성화
Cache.enabled = true;

interface ZodiacModelProps {
  modelPath: string;
  position: [number, number, number];
  scale?: number;
  name: string;
  date: string;
  description?: string;
}

const InfoBox: React.FC<{ name: string; date: string; description?: string; onClose: () => void }> = ({
  name,
  date,
  description,
  onClose
}) => (
  <Billboard
    follow={true}
    lockX={false}
    lockY={false}
    lockZ={false}
  >
    <Html
      center
      position={[0.3, 0, 0]}
      style={{
        width: 'auto',
        height: 'auto',
        transform: 'translate3d(50%, 0, 0)'
      }}
    >
      <div style={{
        background: 'rgba(187, 226, 255, 0.1)',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        width: '200px',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
        <h3 style={{ margin: '0 0 10px 0' }}>{name}</h3>
        <p style={{ margin: '5px 0' }}>{date}</p>
        {description && <p style={{ margin: '10px 0' }}>{description}</p>}
      </div>
    </Html>
  </Billboard>
);

export const ZodiacModel: React.FC<ZodiacModelProps> = ({
  modelPath,
  position,
  scale = 1.5,
  name,
  date,
  description
}) => {
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const gltf = useGLTF(modelPath);

  const { modelScale } = useSpring<{ modelScale: [number, number, number] }>({
    modelScale: hovered ? [scale * 1.1, scale * 1.1, scale * 1.1] : [scale, scale, scale],
    config: { mass: 1, tension: 170, friction: 10 }
  });

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    roughness: 0.01,
    clearcoat: 1,
    metalness: 0.6,
    transparent: true,
    opacity: 0.6,
    color: '#fffff',
    emissive: '#2d68d6',
    emissiveIntensity: 0.4,
  }), []);

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

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setShowInfo(!showInfo);
  };

  return (
    <>
      <animated.group
        ref={modelRef}
        position={position}
        scale={modelScale}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={gltf.scene} />
        {showInfo && (
          <InfoBox
            name={name}
            date={date}
            description={description}
            onClose={() => setShowInfo(false)}
          />
        )}
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