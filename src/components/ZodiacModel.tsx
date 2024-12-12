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
  description,
}) => (
  <Billboard
    follow={true}
    lockX={false}
    lockY={false}
    lockZ={false}
  >
    <Html
      center
      position={[0, -1.8, 0]}
      style={{
        width: 'auto',
        height: 'auto',
      }}
    >
      <div style={{
        background: 'rgba(187, 226, 255, 0.1)',
        padding: '15px',
        borderRadius: '10px',
        color: 'white',
        width: '320px',
        textAlign: 'start',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        fontSize: '13px',
      }}>
        {description && (
          <p style={{ 
            margin: '5px 0',
            whiteSpace: 'pre-line' // 줄바꿈 처리를 위한 속성 추가
          }}>
            {description}
          </p>
        )}
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
  // hovered 상태 제거
  const [showInfo, setShowInfo] = useState(false);
  const gltf = useGLTF(modelPath);

  const { modelScale } = useSpring<{ modelScale: [number, number, number] }>({
    modelScale: showInfo ? [scale * 1.1, scale * 1.1, scale * 1.1] : [scale, scale, scale],
    config: { mass: 1, tension: 170, friction: 10 }
  });

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    roughness: 0.01,
    clearcoat: 1,
    metalness: 0.6,
    transparent: true,
    opacity: 0.6,
    color: '#ffffff',
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
  }

  return (
    <>
      <animated.group
        ref={modelRef}
        position={position}
        scale={modelScale}
        onClick={handleClick}
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