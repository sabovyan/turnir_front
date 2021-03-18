import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import styles from './DigitBoard.module.css';
import { orange } from '@material-ui/core/colors';

interface Props {
  name: string;
}

const boardWith = 300;

const DigitBoard = ({ name }: Props) => {
  const [digits, setDigits] = useState<number[]>(
    Array(13)
      .fill(0)
      .map((el, idx) => el + idx),
  );

  const [delays, setDelays] = useState(
    Array(13)
      .fill(0)
      .map((el, idx) => el + idx),
  );

  const [activeDigitPosition, setActiveDigitPosition] = useState(-1);

  const [scoreTranslate, setScoreTranslate] = useState(0);

  const [count, setCount] = useState(0);

  const handleRemoveIconClick = () => {
    setDelays(
      Array(13)
        .fill(12)
        .map((el, idx) => el - idx),
    );

    setActiveDigitPosition((state) => state + 4);

    setScoreTranslate((state) => state - boardWith / 2);
    setDigits((state) => state.slice(0, state.length - 4));
    setCount((state) => state - 1);
  };

  const handleAddIconClick = () => {
    setDelays(
      Array(13)
        .fill(0)
        .map((el, idx) => el + idx),
    );

    setActiveDigitPosition((state) => state - 4);

    setScoreTranslate((state) => state + boardWith / 2);
    setCount((state) => state + 1);
    setDigits((state) => {
      const newState = [...state];

      for (let i = 0; i < 4; i += 1) {
        newState.push(newState[newState.length - 1] + 1);
      }

      return newState;
    });
  };

  const handleDigitClick = (digit: number) => () => {
    const currentDigitIndex = digits.findIndex((d) => d === digit);
    setActiveDigitPosition(currentDigitIndex);
  };

  return (
    <div className={styles.digitBoard}>
      <Typography
        variant="body1"
        component="p"
        className={styles.digitBoardHeader}
      >
        {name}
      </Typography>
      <div
        className={styles.digitBoardNumpad}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {scoreTranslate > 0 ? (
          <RemoveIcon
            style={{
              cursor: 'pointer',
              width: boardWith / 8,
              height: boardWith / 8,
              background: 'black',
              zIndex: 2,
            }}
            onClick={handleRemoveIconClick}
          />
        ) : (
          <span style={{ width: boardWith / 8 }}></span>
        )}
        <div
          style={{
            width: boardWith,
            overflow: 'hidden',
          }}
        >
          <div
            className={'allowMove'}
            style={{
              background: orange[600],
              width: boardWith / 8,
              height: boardWith / 8,
              position: 'absolute',
              top: 0,
              // left: `${
              //   activeDigitPosition > 7
              //     ? ((activeDigitPosition - 4) * boardWith) / 8
              //     : (activeDigitPosition * boardWith) / 8
              // }px `,
              left: `${(activeDigitPosition + 1) * (boardWith / 8)}px `,
              zIndex: 0,
              borderRadius: '50%',

              transition: 'left 200ms linear',
            }}
          />
          <div
            style={{
              width: boardWith * digits.length,
              height: boardWith / 8,
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {digits.map((el, idx) => (
              <div
                key={el}
                style={{
                  width: boardWith / 8,
                  height: boardWith / 8,
                  lineHeight: boardWith / 128,
                  position: 'absolute',
                  top: '0',
                  left: `${(boardWith / 8) * idx + 1 - scoreTranslate}px`,
                  transition: `left 200ms ease-in-out  ${
                    el - 4 * count <= 0 ? delays[0] : delays[el - 4 * count]
                  }00ms`,
                  cursor: 'pointer',
                }}
                onClick={handleDigitClick(el)}
              >
                {el}
              </div>
            ))}
          </div>
        </div>
        <AddIcon
          onClick={handleAddIconClick}
          style={{
            cursor: 'pointer',
            width: boardWith / 8,
            height: boardWith / 8,
            background: 'black',
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

export default DigitBoard;
