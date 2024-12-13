import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';

import './FindZodiac.css';

const FindZodiac: React.FC = () => {
  const [showBirthModal, setShowBirthModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [constellation, setConstellation] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');

  const calculateConstellation = (date: string): string => {
    const month = parseInt(date.split('-')[1]);
    const day = parseInt(date.split('-')[2]);
    
    // 양자리 (3/21 ~ 4/19)
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '양자리♈︎ ';
    
    // 황소자리 (4/20 ~ 5/20)
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '황소자리♉︎ ';
    
    // 쌍둥이자리 (5/21 ~ 6/21)
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return '쌍둥이자리♊︎ ';
    
    // 게자리 (6/22 ~ 7/22)
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return '게자리♋︎ ';
    
    // 사자자리 (7/23 ~ 8/22)
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '사자자리♌︎ ';
    
    // 처녀자리 (8/23 ~ 9/22)
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '처녀자리♍︎ ';
    
    // 천칭자리 (9/23 ~ 10/23)
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return '천칭자리♎︎ ';
    
    // 전갈자리 (10/24 ~ 11/21)
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) return '전갈자리♏︎ ';
    
    // 사수자리 (11/22 ~ 12/21)
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return '사수자리♐︎ ';
    
    // 염소자리 (12/22 ~ 1/19)
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '염소자리♑︎ ';
    
    // 물병자리 (1/20 ~ 2/18)
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '물병자리♒︎ ';
    
    // 물고기자리 (2/19 ~ 3/20)
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return '물고기자리♓︎';
    
    return '별자리를 찾을 수 없습니다';
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
          <h2>생일을 선택해주세요</h2>
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
        <Confetti
          numberOfPieces={30}
          gravity={0.05}
        />
        <div className="modal result-modal">
          <h2>당신의 별자리는 {constellation}입니다</h2>
          <button className="modal-close-button" onClick={() => setShowResultModal(false)}>닫기</button>
        </div>
        </>
      )}
    </>
  );
};

export default FindZodiac;