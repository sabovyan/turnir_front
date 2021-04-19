export const getNumberFromName = (name: string) => {
  const n = name.split(' ')[0].split('/')[1];
  return Number(n);
};
