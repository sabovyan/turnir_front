import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import Colors from 'src/styles/colors';
import useDigits, {
  ArrayOrder,
  makeArrayOfDigits,
} from '../../hooks/useDigits';

interface Props {
  cellWidth: number;
  order: ArrayOrder;
  maxValue: number;
  transitionDuration: number;
  onDigitClick: (selectedNumber: number) => void;
}

const Test = ({
  cellWidth,
  order,
  maxValue,
  transitionDuration,
  onDigitClick,
}: Props) => {
  const digits = useDigits(order, maxValue);

  const [translateWidth, setTranslateWith] = useState(() => {
    if (order === ArrayOrder.inc) {
      return maxValue > 7 ? (maxValue - 7) * -cellWidth : 0;
    }
    return maxValue > 7 ? (maxValue - 7) * cellWidth : 0;
  });
  const [selectedDigit, setSelectedDigit] = useState(-1);
  const [count, setCount] = useState(0);
  const [delays, setDelays] = useState<number[]>([]);

  const [diff, setDiff] = useState(() => (maxValue >= 8 ? maxValue - 7 : 0));

  // console.log({ diff });

  const handlePlus = () => {
    digits.increment();

    console.log('plus');

    setTranslateWith(
      (state) => {
        console.log(state);
        if (order === ArrayOrder.inc) {
          const width = state - cellWidth * 4;
          return width > 0 ? 0 : width;
        }

        return state + cellWidth * 4;
      },
      // order === ArrayOrder.inc ? state - cellWidth * 4 : state + cellWidth * 4,
    );

    setDelays((state) => makeArrayOfDigits(maxValue + 5, 0, ArrayOrder.inc));

    setCount((state) => state + 1);
  };

  const handleMinus = () => {
    digits.decrement();
    setTranslateWith(
      (state) => {
        if (order === ArrayOrder.inc) {
          const width = state + cellWidth * 4;

          return width > 0 ? 0 : width;
        }

        const width = state - cellWidth * 4;

        return width < 0 ? 0 : width;
      },
      // order === ArrayOrder.inc ? state + cellWidth * 4 : state - cellWidth * 4,
    );

    setDelays((state) =>
      makeArrayOfDigits(maxValue + 5, maxValue + 4, ArrayOrder.dec),
    );
    setCount((state) => (state - 1 < 0 ? 0 : state - 1));
  };

  const handleDigitClick = (digit: number) => () => {
    setSelectedDigit(digit);
    onDigitClick(digit);
  };

  // console.log({ exp: count * 4 - diff });
  // console.log({ count });

  useEffect(() => {
    if (translateWidth === 0) {
      setDiff(0);
    }
  }, [translateWidth]);

  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.sideColor,
        color: Colors.white,
        fontSize: '1.1rem',
      }}
    >
      <IconButton
        style={{
          zIndex: 2,
          minWidth: cellWidth,
          minHeight: cellWidth,
          margin: 0,
          padding: 0,
          fontSize: 32,
          background: Colors.sideColor,
          borderRadius: 0,
          color: 'white',
          visibility:
            order === ArrayOrder.inc && translateWidth === 0
              ? 'hidden'
              : 'visible',
        }}
        onClick={order === ArrayOrder.inc ? handleMinus : handlePlus}
      >
        {order === ArrayOrder.inc ? '-' : '+'}
      </IconButton>
      <ul
        style={{
          display: 'flex',
          listStyleType: 'none',
          padding: 0,
          width: cellWidth * 8,
          height: cellWidth,
          position: 'relative',
          overflow: 'hidden',
          margin: '0 10px',
        }}
      >
        {digits.list.map((el, idx) => (
          <li
            key={el}
            style={{
              width: cellWidth,
              height: cellWidth,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              cursor: 'pointer',
              zIndex: 1,
              left:
                order === ArrayOrder.inc
                  ? cellWidth * idx + translateWidth
                  : 'none',
              right:
                order === ArrayOrder.dec
                  ? cellWidth * idx - translateWidth
                  : 'none',
              transition: `right ${transitionDuration}ms ease-in-out ${
                idx - count * 4 < 0
                  ? 0
                  : (delays[idx - count * 4] * transitionDuration) / 5
              }ms, left ${transitionDuration}ms ease-in-out ${
                idx - count * 4 < 0
                  ? 0
                  : (delays[idx - count * 4] * transitionDuration) / 5
              }ms`,
            }}
            onClick={handleDigitClick(el)}
          >
            {el}
          </li>
        ))}

        <span
          style={{
            background: Colors.orange,
            width: cellWidth,
            height: cellWidth,
            borderRadius: '50%',
            position: 'absolute',
            left:
              order === ArrayOrder.inc
                ? selectedDigit * cellWidth - (count * 4 + diff) * cellWidth
                : 'none',
            right:
              order === ArrayOrder.dec
                ? selectedDigit * cellWidth - (count * 4 + diff) * cellWidth
                : 'none',

            transition: `right ${transitionDuration}ms ease-in-out ${
              selectedDigit - count * 4 < 0
                ? 0
                : (delays[selectedDigit - count * 4] * transitionDuration) / 5
            }ms, left ${transitionDuration}ms ease-in-out ${
              selectedDigit - count * 4 < 0
                ? 0
                : (delays[selectedDigit - count * 4] * transitionDuration) / 5
            }ms`,
          }}
        />
      </ul>

      <IconButton
        style={{
          zIndex: 2,
          minWidth: cellWidth,
          minHeight: cellWidth,
          margin: 0,
          padding: 0,
          fontSize: 32,
          background: Colors.sideColor,
          borderRadius: 0,
          color: 'white',
          visibility:
            order === ArrayOrder.dec && translateWidth === 0
              ? 'hidden'
              : 'visible',
        }}
        onClick={order === ArrayOrder.inc ? handlePlus : handleMinus}
      >
        {order === ArrayOrder.inc ? '+' : '-'}
      </IconButton>
    </div>
  );
};

export default Test;
