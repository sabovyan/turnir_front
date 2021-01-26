const getArrayWithNameAndQuantity = (quantity: number) =>
  new Array(quantity).fill(0).map((el, idx) => el + idx + 1);

export const tablesArray = getArrayWithNameAndQuantity(200);
export const goalsArray = getArrayWithNameAndQuantity(200);
