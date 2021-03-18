import { PlayerWithNameAndId } from '../types/main.types';

const deepCopyArray = (
  array: { name: string; id?: number }[],
): PlayerWithNameAndId[] => {
  return JSON.parse(JSON.stringify(array));
};

export default deepCopyArray;
