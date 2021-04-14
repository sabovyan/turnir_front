import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useRef, useState } from 'react';
import Colors from 'src/styles/colors';
import useDigits, {
  ArrayOrder,
  makeArrayOfDigits,
  roughHalf,
} from '../../hooks/useDigits';

interface Props {
  cellWidth: number;
  order: ArrayOrder;
  maxValue: number;
  transitionDuration: number;
  onDigitClick: (selectedNumber: number) => void;
  chosen: number;
}

const DigitBoard = ({
  cellWidth,
  order,
  maxValue,
  transitionDuration,
  chosen,
  onDigitClick,
}: Props) => {
  const digits = useDigits(order, maxValue + 1);

  const [translateWidth, setTranslateWith] = useState(() => {
    const width = maxValue >= 8 ? (maxValue - 7) * cellWidth : 0;
    return order === ArrayOrder.inc ? width * -1 : width;
  });
  const [diff, setDiff] = useState(() =>
    maxValue >= 8 ? (maxValue + 1) % 4 : 0,
  );
  const minWidthToTranslate = useRef<number>(
    maxValue >= 8 ? 4 : roughHalf(maxValue),
  );

  const [selectedDigit, setSelectedDigit] = useState(chosen);
  const [count, setCount] = useState(
    maxValue >= 8 ? Math.floor((maxValue + 1 - 8) / 4) : 0,
  );

  const [delays, setDelays] = useState<number[]>([]);

  const handlePlus = () => {
    digits.increment();

    setTranslateWith((state) => {
      if (order === ArrayOrder.inc) {
        const width = state - minWidthToTranslate.current * cellWidth;
        return width > 0 ? 0 : width;
      }

      return state + minWidthToTranslate.current * cellWidth;
    });

    setDelays((state) =>
      makeArrayOfDigits(
        maxValue + minWidthToTranslate.current,
        0,
        ArrayOrder.inc,
      ),
    );

    setCount((state) => state + 1);
  };

  const handleMinus = () => {
    digits.decrement();
    setTranslateWith((state) => {
      if (order === ArrayOrder.inc) {
        const width = state + minWidthToTranslate.current * cellWidth;
        return width > 0 ? 0 : width;
      }
      const width = state - minWidthToTranslate.current * cellWidth;
      return width < 0 ? 0 : width;
    });

    setDelays((state) => {
      const value =
        maxValue + roughHalf(maxValue) > 12
          ? 12
          : maxValue + roughHalf(maxValue);

      return makeArrayOfDigits(value, value, ArrayOrder.dec);
    });
    setCount((state) => (state - 1 < 0 ? 0 : state - 1));
  };

  const handleDigitClick = (digit: number) => () => {
    setSelectedDigit(digit);
    onDigitClick(digit);
  };

  useEffect(() => {
    if (translateWidth === 0) {
      setDiff(0);
    }
  }, [translateWidth]);

  useEffect(() => {
    if (chosen > -1) {
      setSelectedDigit(chosen);
    }
  }, [chosen]);

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
          width: cellWidth * (maxValue + 1),
          maxWidth: cellWidth * 8,
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
                idx - count * minWidthToTranslate.current < 0
                  ? 0
                  : (delays[idx - count * minWidthToTranslate.current] *
                      transitionDuration) /
                    5
              }ms, left ${transitionDuration}ms ease-in-out ${
                idx - count * minWidthToTranslate.current < 0
                  ? 0
                  : (delays[idx - count * minWidthToTranslate.current] *
                      transitionDuration) /
                    5
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
                ? selectedDigit * cellWidth -
                  (count * minWidthToTranslate.current + diff) * cellWidth
                : 'none',
            right:
              order === ArrayOrder.dec
                ? selectedDigit * cellWidth -
                  (count * minWidthToTranslate.current + diff) * cellWidth
                : 'none',

            transition: `right ${transitionDuration}ms ease-in-out ${
              selectedDigit - count * minWidthToTranslate.current < 0
                ? 0
                : (delays[selectedDigit - count * minWidthToTranslate.current] *
                    transitionDuration) /
                  5
            }ms, left ${transitionDuration}ms ease-in-out ${
              selectedDigit - count * minWidthToTranslate.current < 0
                ? 0
                : (delays[selectedDigit - count * minWidthToTranslate.current] *
                    transitionDuration) /
                  5
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

export default DigitBoard;
