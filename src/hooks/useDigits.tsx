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

const useDigits = (type: ArrayOrder, length: number) => {
  // const [digits, setDigits] = useState(
  //   type === ArrayOrder.inc
  //     ? makeArrayOfDigits(length + 5, 0, ArrayOrder.inc)
  //     : makeArrayOfDigits(length + 5, length + 4, ArrayOrder.dec),
  // );
  const [digits, setDigits] = useState(
    makeArrayOfDigits(length + 5, 0, ArrayOrder.inc),
  );

  const increment = () => {
    setDigits((state) => {
      const newState = [...state];
      for (let i = 0; i < 4; i++) {
        newState.push(newState[newState.length - 1] + 1);
      }

      return newState;
    });
  };

  const decrement = () => {
    setDigits((state) => state.slice(0, state.length - 4));
  };

  return {
    list: digits,
    increment,
    decrement,
  };
};

export default useDigits;
