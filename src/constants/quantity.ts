const getArrayOfQuantity = (quantity: number) =>
  new Array(quantity).fill(0).map((el, idx) => el + idx + 1);

export const tablesArray = getArrayOfQuantity(200);
export const goalsArray = getArrayOfQuantity(200);
export const winningSetsArray = getArrayOfQuantity(10);
