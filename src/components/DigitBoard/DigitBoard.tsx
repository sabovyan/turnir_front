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
  const [digits, setDigits] = useState<{ array: number[]; delayDiff: number }>({
    array: Array(13)
      .fill(0)
      .map((el, idx) => el + idx),
    delayDiff: 0,
  });

  const [activeDigitPosition, setActiveDigitPosition] = useState(-1);

  const [initMovement, setInitMovement] = useState(false);

  const [scoreTranslate, setScoreTranslate] = useState(0);

  const handleRemoveIconClick = () => {
    setScoreTranslate((state) => state - boardWith / 2);
    setDigits((state) => ({
      array: state.array.slice(0, state.array.length - 5),
      delayDiff: state.delayDiff - 4,
    }));
    setInitMovement(true);
  };

  const handleAddIconClick = () => {
    setScoreTranslate((state) => state + boardWith / 2);

    setDigits((state) => {
      const newState = [...state.array];

      for (let i = 0; i < 4; i += 1) {
        newState.push(newState[newState.length - 1] + 1);
      }

      return { array: newState, delayDiff: state.delayDiff + 4 };
    });

    setInitMovement(true);
  };

  const handleDigitClick = (digit: number) => () => {
    const currentDigitIndex = digits.array.findIndex((d) => d === digit);
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
            position: 'relative',
            // transform: `translateX(-${scoreTranslate}px)`,
            // transition: `transform 200ms cubic-bezier(.16,.63,.67,.93) 200ms`,
            border: `1px solid ${orange[600]}`,
            overflow: 'hidden',
          }}
        >
          {/* {digits.array.map((el, idx) => (
            <div
              style={{
                textAlign: 'center',
                // position: 'absolute',
                top: '0',
                left: `${(boardWith / 8) * (idx + 1)}px`,
                width: (boardWith / 8) * digits.array.length,
                // // transition: 'min-width 400ms linear ',
                // height: boardWith / 8,
                // lineHeight: boardWith / 128,
                // cursor: 'pointer',
                // // zIndex: 1,
                // // transform: `translateX(${
                // //   initMovement && idx > digits.array.length - 4 ? 200 : 0
                // // }px)`,
                // // transition: `transform ${
                // //   digits.array.length - idx - 4
                // // }00ms linear`,
                color: orange[600],
              }}
              key={el}
              onClick={handleDigitClick(el)}
            >
              {el}
            </div>
          ))} */}
          {/* <div
            className={'allowMove'}
            style={{
              background: orange[600],
              width: boardWith / 8,
              height: boardWith / 8,
              color: 'white',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0,
              borderRadius: '50%',
              transform: `translateX(${
                activeDigitPosition * (boardWith / 8)
              }px)`,
              transition: 'transform 200ms linear',
            }}
          /> */}
        </div>
        <AddIcon onClick={handleAddIconClick} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
};

export default DigitBoard;
