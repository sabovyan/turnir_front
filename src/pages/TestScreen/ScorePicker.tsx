import React, { useState } from 'react';
import Test from 'src/components/DigitBoard/Test';
import { ArrayOrder } from 'src/hooks/useDigits';
import Colors from 'src/styles/colors';

interface Props {
  goalsToWin: number;
}

const ScorePicker = ({ goalsToWin }: Props) => {
  const [score1, setScore1] = useState<number>();
  const [score2, setScore2] = useState<number>();

  const handleLeftDigitBoardClick = (num: number) => {
    setScore1(num);
  };
  const handleRightDigitBoardClick = (num: number) => {
    setScore2(num);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: Colors.sideColor,
        color: Colors.white,
        padding: '2rem 0',
        justifyContent: 'space-around',
      }}
    >
      <Test
        cellWidth={37.5}
        maxValue={goalsToWin}
        onDigitClick={handleLeftDigitBoardClick}
        order={ArrayOrder.inc}
        transitionDuration={200}
      />
      <div
        style={{
          display: 'flex',
          fontSize: '2.2rem',
          gap: '1rem',
          margin: '0 1rem',
        }}
      >
        <div style={{ minWidth: '3rem', textAlign: 'center' }}>
          {score1 === undefined ? '-' : score1}
        </div>
        <div>:</div>
        <div style={{ minWidth: '3rem', textAlign: 'center' }}>
          {score2 === undefined ? '-' : score2}
        </div>
      </div>

      <Test
        cellWidth={37.5}
        maxValue={goalsToWin}
        onDigitClick={handleRightDigitBoardClick}
        order={ArrayOrder.dec}
        transitionDuration={200}
      />
    </div>
  );
};

export default ScorePicker;
