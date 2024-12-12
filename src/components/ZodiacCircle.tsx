import React from 'react';
import { ZodiacModel } from './ZodiacModel';
import { zodiacModels, zodiacDates, ZodiacSign } from '../constants/zodiac';
import { useThree } from '@react-three/fiber';

interface ZodiacCircleProps {
  radius?: number;
  yOffset?: number;
}

export const ZodiacCircle: React.FC<ZodiacCircleProps> = ({ 
  radius = 15,
  yOffset = 0 
}) => {
  const { viewport } = useThree();
  const responsiveRadius = radius * (viewport.width < 10 ? 0.7 : 1);

  const calculatePosition = (index: number): [number, number, number] => {
    const totalItems = Object.keys(zodiacModels).length;
    const angle = (index * 360) / totalItems;
    const radian = (angle * Math.PI) / 180;
    
    return [
      responsiveRadius * Math.cos(radian),
      yOffset,
      responsiveRadius * Math.sin(radian)
    ];
  };

  return (
    <>
      {Object.entries(zodiacModels).map(([name, path], index) => {
        const position = calculatePosition(index);
        const zodiacName = name as ZodiacSign;
        
        return (
          <ZodiacModel
            key={zodiacName}
            modelPath={path}
            position={position}
            name={zodiacName}
            date={zodiacDates[zodiacName]}
            scale={viewport.width < 10 ? 1 : 1.5}
          />
        );
      })}
    </>
  );
};