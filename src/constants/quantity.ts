const getArrayOfQuantity = (quantity: number) =>
  new Array(quantity).fill(0).map((el, idx) => el + idx + 1);

export const tablesArray = getArrayOfQuantity(200);
export const goalsArray = getArrayOfQuantity(200);
export const winningSetsArray = getArrayOfQuantity(10);
export const pointsArray = getArrayOfQuantity(100);
export const livesArray = getArrayOfQuantity(10);
