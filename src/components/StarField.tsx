// src/components/StarField.tsx
import { Canvas } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointsMaterial, BufferGeometry, Float32BufferAttribute, Color } from 'three';

const NUM_STARS = 700;
const NUM_LAYERS = 2;

function StarLayer({ phase = 0 }) {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(NUM_STARS * 3);
    for (let i = 0; i < NUM_STARS * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 100;      // x
      arr[i + 1] = (Math.random() - 0.5) * 50;  // y
      arr[i + 2] = (Math.random() - 0.5) * 50;  // z
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03);
      
      const material = pointsRef.current.material as PointsMaterial;
      material.opacity = 0.6 + Math.sin(state.clock.elapsedTime + phase) * 0.4;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.09}
        sizeAttenuation={true}
        color={new Color('#ffffff')}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

export function StarField() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: 0 
      }}>
      <Canvas camera={{ 
        position: [0, 0, 20], 
        fov: 60 }}>
        {Array(NUM_LAYERS).fill(0).map((_, idx) => (
          <StarLayer key={idx} phase={idx * Math.PI / NUM_LAYERS} />
        ))}
      </Canvas>
    </div>
  );
}