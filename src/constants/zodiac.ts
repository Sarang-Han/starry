// src/constants/zodiac.ts
export const zodiacModels = {
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
  
  export const zodiacDates = {
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

  export const zodiacDescriptions = {
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
  } as const;
  
  export type ZodiacSign = keyof typeof zodiacModels;
  export type ZodiacDates = Record<ZodiacSign, string>;