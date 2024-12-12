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
  
  export type ZodiacSign = keyof typeof zodiacModels;
  export type ZodiacDates = Record<ZodiacSign, string>;