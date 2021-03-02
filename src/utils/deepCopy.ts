import { SetupPlayer } from '../types/main.types';

const deepCopyArray = (
  array: { name: string; id?: number }[],
): SetupPlayer[] => {
  return JSON.parse(JSON.stringify(array));
};

export default deepCopyArray;
