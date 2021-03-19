import {
  Participant,
  Player,
  PlayerResponse,
  PlayerWithInputValue,
} from '../../../types/main.types';

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

export const findPlayerByName = (value: string) => (
  player: PlayerResponse | Participant,
) => player.name.toLowerCase().includes(value.toLowerCase());

export const getAvailablePlayers = (
  tournamentPlayers: Participant[],
  possiblePlayers: PlayerResponse[],
  value: string,
): PlayerWithInputValue[] => {
  const foundPlayersInTournament = tournamentPlayers.filter(
    findPlayerByName(value),
  );

  const possiblePlayersInGeneral = possiblePlayers.filter(
    findPlayerByName(value),
  );

  if (foundPlayersInTournament.length) {
    const players = possiblePlayersInGeneral.filter(
      (player) => !tournamentPlayers.some((pl) => pl.name === player.name),
    );
    return players;
  }

  return possiblePlayersInGeneral;
};
