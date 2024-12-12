import React from 'react';
import { ZodiacModel } from './ZodiacModel';
import { zodiacModels, zodiacDates, ZodiacSign } from '../constants/zodiac';
import { useThree } from '@react-three/fiber';

interface ZodiacCircleProps {
  radius?: number;
  yOffset?: number;
}

const zodiacDescriptions: Record<ZodiacSign, string> = {
  Aries: "양자리는 황도12궁의 첫 번째 별자리입니다. 봄의 시작을 상징하며 화성의 지배를 받습니다.",
  Taurus: "황소자리는 황도12궁의 두 번째 별자리입니다. 금성의 지배를 받으며 안정성과 인내를 상징합니다.",
  Gemini: "쌍둥이자리는 황도12궁의 세 번째 별자리입니다. 수성의 지배를 받으며 지성과 의사소통을 상징합니다.",
  Cancer: "게자리는 황도12궁의 네 번째 별자리입니다. 달의 지배를 받으며 감성과 직관을 상징합니다.",
  Leo: "사자자리는 황도12궁의 다섯 번째 별자리입니다. 태양의 지배를 받으며 창조성과 자신감을 상징합니다.",
  Virgo: "처녀자리는 황도12궁의 여섯 번째 별자리입니다. 수성의 지배를 받으며 분석력과 완벽주의를 상징합니다.",
  Libra: "천칭자리는 황도12궁의 일곱 번째 별자리입니다. 금성의 지배를 받으며 균형과 조화를 상징합니다.",
  Scorpius: "전갈자리는 황도12궁의 여덟 번째 별자리입니다. 화성과 명왕성의 지배를 받으며 강인함과 정열을 상징합니다.",
  Sagittarius: "궁수자리는 황도12궁의 아홉 번째 별자리입니다. 목성의 지배를 받으며 자유와 모험을 상징합니다.",
  Capricornus: "염소자리는 황도12궁의 열 번째 별자리입니다. 토성의 지배를 받으며 책임감과 야망을 상징합니다.",
  Aquarius: "물병자리는 황도12궁의 열한 번째 별자리입니다. 천왕성의 지배를 받으며 혁신과 독창성을 상징합니다.",
  Pisces: "물고기자리는 황도12궁의 열두 번째 별자리입니다. 해왕성의 지배를 받으며 영성과 직관을 상징합니다."
};

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
            description={zodiacDescriptions[zodiacName]}
            scale={viewport.width < 10 ? 1 : 1.5}
          />
        );
      })}
    </>
  );
};