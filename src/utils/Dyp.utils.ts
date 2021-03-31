import {
  ArrangedParticipants,
  PreParticipant,
  Side,
} from 'src/types/main.types';

export const sortParticipants = (participants: PreParticipant[]) => {
  const copy: PreParticipant[] = JSON.parse(JSON.stringify(participants));
  copy.sort((a, b) => a.side - b.side);
  return copy;
};

export const createSides = (participants: PreParticipant[]) => {
  let isLeft: boolean = true;

  const sides = participants.reduce<ArrangedParticipants>(
    (acc, participant) => {
      if (participant.side === Side.left) {
        acc.left.push(participant);
      } else if (participant.side === Side.right) {
        acc.right.push(participant);
      } else {
        if (acc.left.length > acc.right.length) {
          isLeft = false;
        }

        if (isLeft) {
          acc.left.push(participant);
          isLeft = false;
        } else {
          acc.right.push(participant);
          isLeft = true;
        }
      }
      return acc;
    },
    {
      right: [],
      left: [],
    },
  );

  return sides;
};
