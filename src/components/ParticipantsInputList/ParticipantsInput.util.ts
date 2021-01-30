import { Player } from '../../types/main.types';

export const checkIfPlayersNameExist = (
  players: Player[],
  index: number,
  name: string,
) =>
  players.some(
    (el, idx) => idx !== index && el.name !== '' && el.name === name.trim(),
  );

export const generateId = () => {
  let id = 0;

  return () => {
    id += 1;
    return id;
  };
};
