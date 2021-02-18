import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import styles from './DigitBoard.module.css';

interface Props {
  name: string;
}

const boardWith = 300;

const DigitBoard = ({ name }: Props) => {
  const [digits, setDigits] = useState<{ array: number[]; delayDiff: number }>({
    array: Array(12)
      .fill(0)
      .map((el, idx) => el + idx),
    delayDiff: 0,
  });

  const [scoreTranslate, setScoreTranslate] = useState(0);

  const handleRemoveIconClick = () => {
    setScoreTranslate((state) => state - boardWith / 2);
    setDigits((state) => ({ ...state, delayDiff: state.delayDiff - 4 }));
  };

  const handleAddIconClick = () => {
    setScoreTranslate((state) => state + boardWith / 2);

    setDigits((state) => {
      const newState = [...state.array];

      for (let i = 0; i <= 4; i += 1) {
        newState.push(newState[newState.length - 1] + 1);
      }

      return { array: newState, delayDiff: state.delayDiff + 4 };
    });
  };

  console.log((boardWith / 8 - 16) / 4);

  return (
    <div className={styles.digitBoard}>
      <Typography
        variant="body1"
        component="p"
        className={styles.digitBoardHeader}
      >
        {name}
      </Typography>
      <div className={styles.digitBoardNumpad}>
        {scoreTranslate > 0 ? (
          <RemoveIcon
            style={{ cursor: 'pointer' }}
            onClick={handleRemoveIconClick}
          />
        ) : (
          <span style={{ width: '24px' }}></span>
        )}

        <div
          style={{
            width: boardWith,
            display: 'flex',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* TODO solve lineHeight problem */}
          {digits.array.map((el, idx) => (
            <div
              style={{
                transform: `translateX(-${scoreTranslate}px)`,
                transition: `transform ${
                  idx - digits.delayDiff + 5
                }00ms cubic-bezier(.3,.79,.82,.81) ${
                  idx - digits.delayDiff - 5
                }0ms`,
                textAlign: 'center',
                minWidth: boardWith / 8,
                height: boardWith / 8,
                lineHeight: boardWith / 8,
                cursor: 'pointer',
                zIndex: 1,
              }}
              key={el}
            >
              {el}
            </div>
          ))}
          <div
            style={{
              background: 'orange',
              width: boardWith / 8,
              height: boardWith / 8,
              color: 'white',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
              borderRadius: '50%',
            }}
          ></div>
        </div>
        <AddIcon onClick={handleAddIconClick} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default DigitBoard;
