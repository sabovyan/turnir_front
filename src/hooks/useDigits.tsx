import { useState } from 'react';

export enum ArrayOrder {
  inc,
  dec,
}

export const makeArrayOfDigits = (
  length: number,
  initialValue: number,
  order: ArrayOrder,
) =>
  order === ArrayOrder.inc
    ? Array(length)
        .fill(initialValue)
        .map((el, idx) => el + idx)
    : Array(length)
        .fill(initialValue)
        .map((el, idx) => el - idx);

export const roughHalf = (length: number) => Math.round(length / 2);

const useDigits = (type: ArrayOrder, length: number) => {
  // const [digits, setDigits] = useState(
  //   type === ArrayOrder.inc
  //     ? makeArrayOfDigits(length + 5, 0, ArrayOrder.inc)
  //     : makeArrayOfDigits(length + 5, length + 4, ArrayOrder.dec),
  // );

  const [digits, setDigits] = useState(() => {
    const additional = roughHalf(length) >= 4 ? 4 : roughHalf(length);
    return makeArrayOfDigits(length + additional, 0, ArrayOrder.inc);
  });

  const increment = () => {
    setDigits((state) => {
      const newState = [...state];
      const end = roughHalf(length) >= 4 ? 4 : roughHalf(length);

      for (let i = 0; i < end; i++) {
        newState.push(newState[newState.length - 1] + 1);
      }

      return newState;
    });
  };

  const decrement = () => {
    const end = roughHalf(length) >= 4 ? 4 : roughHalf(length);

    setDigits((state) =>
      state.slice(0, state.length - end).length < length
        ? state
        : state.slice(0, state.length - end),
    );
  };

  return {
    list: digits,
    increment,
    decrement,
  };
};

export default useDigits;
