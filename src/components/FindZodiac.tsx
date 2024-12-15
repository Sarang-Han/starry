import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './FindZodiac.css';

const ZODIAC_EMOJIS = {
  aries: '🐏',
  taurus: '🐂',
  gemini: '👯',
  cancer: '🦀',
  leo: '🦁',
  virgo: '💃',
  libra: '⚖️',
  scorpio: '🦂',
  sagittarius: '🏹',
  capricorn: '🐐',
  aquarius: '🍶',
  pisces: '🐟'
};

const FORTUNE_DATA = {
  ranks: ['1위 🥇', '2위 🥈', '3위 🥉', '4위', '5위', '6위', '7위', '8위', '9위', '10위', '11위', '12위'],
  messages: [
    '당신의 개성이 빛날 하루입니다. 주변에서 당신에게 의지할 일이 많아질 거예요. 결실이 풍성한 하루를 기대해 보세요.',
    '반가운 서비스와 기쁜 일이 생길 가능성이 높아요. 평소 가보지 않은 새로운 장소를 찾아보세요.',
    '소중한 정보를 얻을 수 있는 날이에요. 친구들과 시간을 보내며 뜻깊은 대화를 나눠보세요.',
    '사랑이 깊어지는 순간을 맞이할 수 있어요. 진지한 태도가 좋은 인상을 남길 거예요.',
    '크게 전진할 기회가 찾아옵니다. 즐기는 마음으로 새로운 도전을 시작해보세요.',
    '알뜰한 쇼핑의 기회를 잡을 수 있어요. 할인된 상품들을 잘 찾아보세요.',
    '목표를 향해 자신감을 가지고 전진하세요. 직감을 믿고 행동하면 좋은 결과를 얻을 수 있을 거예요.',
    '기운이 떨어질 수 있으니 재충전의 시간을 가지세요. 충분한 휴식으로 활력을 되찾아 보세요.',
    '지출에 신중해야 할 날입니다. 지금은 충동적인 소비를 삼가고 필요한 것만 구매하세요.',
    '오늘은 주변 상황을 잘 살피는 것이 중요합니다. 차분히 하루를 보내며 기회를 엿보세요.',
    '작은 어려움이 있을 수 있지만 긍정적인 태도가 중요한 날입니다. 작은 일에도 감사하며 보내세요.',
    '느긋하게 자신을 돌아보며 보내기 좋은 날입니다. 새로운 인연이나 기회가 다가올지도 몰라요.'
  ],
  luckyActions: [
    '🍀 사우나나 목욕탕에 가기',
    '🍀 평소에 가지 않던 가게 방문하기',
    '🍀 장미무늬 물건 가지고 다니기',
    '🍀 가족 사진 찍기',
    '🍀 초록색 마스크 쓰기',
    '🍀 검은색 옷 입기',
    '🍀 소량의 소금을 담고 손 씻기',
    '🍀 제스처 게임 하기',
    '🍀 마늘빵 먹기',
    '🍀 커피 두 잔 마시기',
    '🍀 핸드폰을 잠시 끄고 명상하기',
    '🍀 친구에게 짧은 칭찬 보내기',
    '🍀 달걀 요리를 먹기',
    '🍀 동쪽으로 몇 걸음 걸어보기',
    '🍀 자신만의 노래를 크게 부르기',
    '🍀 좋아하는 색상의 옷 입기'
  ]
};

// 랜덤 운세 생성 함수
const getRandomFortune = () => {
  return {
    rank: FORTUNE_DATA.ranks[Math.floor(Math.random() * FORTUNE_DATA.ranks.length)],
    message: FORTUNE_DATA.messages[Math.floor(Math.random() * FORTUNE_DATA.messages.length)],
    action: FORTUNE_DATA.luckyActions[Math.floor(Math.random() * FORTUNE_DATA.luckyActions.length)]
  };
};

const FindZodiac: React.FC = () => {
  const [showBirthModal, setShowBirthModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [constellation, setConstellation] = useState<{ name: string, emoji: string }>({ name: '', emoji: '' });
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');

  // 컴포넌트에 상태 추가
  const [fortune, setFortune] = useState(getRandomFortune());

  const calculateConstellation = (date: string): { name: string, emoji: string } => {
    const month = parseInt(date.split('-')[1]);
    const day = parseInt(date.split('-')[2]);
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) 
      return { name: '양자리♈︎', emoji: ZODIAC_EMOJIS.aries };
    
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) 
      return { name: '황소자리♉︎', emoji: ZODIAC_EMOJIS.taurus };
    
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) 
      return { name: '쌍둥이자리♊︎', emoji: ZODIAC_EMOJIS.gemini };
    
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) 
      return { name: '게자리♋︎', emoji: ZODIAC_EMOJIS.cancer };
    
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) 
      return { name: '사자자리♌︎', emoji: ZODIAC_EMOJIS.leo };
    
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) 
      return { name: '처녀자리♍︎', emoji: ZODIAC_EMOJIS.virgo };
    
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) 
      return { name: '천칭자리♎︎', emoji: ZODIAC_EMOJIS.libra };
    
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) 
      return { name: '전갈자리♏︎', emoji: ZODIAC_EMOJIS.scorpio };
    
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) 
      return { name: '사수자리♐︎', emoji: ZODIAC_EMOJIS.sagittarius };
    
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) 
      return { name: '염소자리♑︎', emoji: ZODIAC_EMOJIS.capricorn };
    
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) 
      return { name: '물병자리♒︎', emoji: ZODIAC_EMOJIS.aquarius };
    
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) 
      return { name: '물고기자리♓︎', emoji: ZODIAC_EMOJIS.pisces };
    
    return { name: '별자리를 찾을 수 없습니다', emoji: '' };
  };

  const getDaysInMonth = (month: string) => {
    const daysIn31 = ['1', '3', '5', '7', '8', '10', '12'];
    const daysIn30 = ['4', '6', '9', '11'];
    
    if (!month) return [];
    if (daysIn31.includes(month)) return Array.from({length: 31}, (_, i) => (i + 1).toString());
    if (daysIn30.includes(month)) return Array.from({length: 30}, (_, i) => (i + 1).toString());
    return Array.from({length: 28}, (_, i) => (i + 1).toString()); // 2월
  };

  const handleDateSubmit = () => {
    if (!selectedMonth || !selectedDay) return;
    const result = calculateConstellation(`2024-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`);
    setConstellation(result);
    setFortune(getRandomFortune());
    setShowBirthModal(false);
    setShowResultModal(true);
  };

  return (
    <>
      <button 
        className="search-button"
        onClick={() => setShowBirthModal(true)}
        aria-label="별자리 찾기"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>

      {showBirthModal && (
        <div className="modal birth-modal">
          <h3>생일을 선택해주세요</h3>
          <div className="select-container">
            <select 
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setSelectedDay('');
              }}
            >
              <option value="">월</option>
              {Array.from({length: 12}, (_, i) => (i + 1).toString()).map(month => (
                <option key={month} value={month}>{month}월</option>
              ))}
            </select>

            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              disabled={!selectedMonth}
            >
              <option value="">일</option>
              {getDaysInMonth(selectedMonth).map(day => (
                <option key={day} value={day}>{day}일</option>
              ))}
            </select>
          </div>
          <div className="modal-buttons">
            <button onClick={handleDateSubmit}>확인</button>
            <button onClick={() => setShowBirthModal(false)}>취소</button>
          </div>
        </div>
      )}

      {showResultModal && (
        <>
  
          <div className="modal result-modal">
            <p>당신의 별자리는
            <div className="zodiac-emoji">
            {constellation.emoji}
            </div>
            <b>{constellation.name}</b> 입니다!</p>

            <div className="fortune-content">
              <h3>행운 순위: {fortune.rank}</h3>
              <p>{fortune.message}</p>
              <p className="lucky-action">{fortune.action}</p>
            </div>
            <button onClick={() => setShowResultModal(false)}>닫기</button>
          </div>
        </>
      )}
    </>
  );
};

export default FindZodiac;