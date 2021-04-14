import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DigitBoard from 'src/components/DigitBoard/DigitBoard';
import { ArrayOrder } from 'src/hooks/useDigits';
import { setScore } from 'src/store/features/scoreBoard.feature';
import Colors from 'src/styles/colors';

interface Props {
  winningPoints: number;
  left: number;
  right: number;
  pointer: number;
}

const ScorePicker = ({ winningPoints, left, right, pointer }: Props) => {
  const [leftScore, setLeftScore] = useState<number>(left);
  const [rightScore, setRightScore] = useState<number>(right);

  const dispatch = useDispatch();

  const handleLeftDigitBoardClick = (num: number) => {
    if (num < winningPoints && rightScore === -1) {
      setRightScore(winningPoints);
    }
    dispatch(setScore({ idx: pointer, left: num }));

    setLeftScore(num);
  };
  const handleRightDigitBoardClick = (num: number) => {
    if (num < winningPoints && leftScore === -1) {
      setLeftScore(winningPoints);
    }
    setRightScore(num);
    dispatch(setScore({ idx: pointer, right: num }));
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
      <DigitBoard
        cellWidth={winningPoints > 90 ? 50 : 37.5}
        maxValue={winningPoints}
        onDigitClick={handleLeftDigitBoardClick}
        order={ArrayOrder.inc}
        transitionDuration={200}
        chosen={leftScore}
      />
      <div
        style={{
          display: 'flex',
          fontSize: '1.6rem',
          gap: '1rem',
          margin: '0 1rem',
        }}
      >
        <div style={{ minWidth: '2rem', textAlign: 'center' }}>
          {leftScore === -1 ? '-' : leftScore}
        </div>
        <div>:</div>
        <div style={{ minWidth: '2rem', textAlign: 'center' }}>
          {rightScore === -1 ? '-' : rightScore}
        </div>
      </div>

      <DigitBoard
        cellWidth={winningPoints > 90 ? 50 : 37.5}
        maxValue={winningPoints}
        onDigitClick={handleRightDigitBoardClick}
        order={ArrayOrder.dec}
        transitionDuration={200}
        chosen={rightScore}
      />
    </div>
  );
};

export default ScorePicker;
