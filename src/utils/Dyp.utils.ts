import { ArrangedParticipants, Participant, Side } from 'src/types/main.types';
import deepCopyArray from './deepCopy';
import pipe from './pipe';

export const countLeftAndRightSides = (participants: Participant[]) => {
  let leftCounter = 0;
  let rightCounter = 0;

  participants.forEach((p) => {
    if (p.side === Side.left) {
      leftCounter += 1;
    }

    if (p.side === Side.right) {
      rightCounter += 1;
    }
  });

  return { leftCounter, rightCounter, participants };
};

type PipeArgs = {
  participants: Participant[];
  leftCounter: number;
  rightCounter: number;
};

const divideNeutralParticipantsBetweenTwoSides = ({
  participants,
  leftCounter,
  rightCounter,
}: PipeArgs): PipeArgs => {
  let isLeft = true;
  const arrangedParticipants = participants.map((p) => {
    if (p.side !== Side.neutral) return p;

    isLeft = leftCounter > rightCounter ? false : true;

    if (isLeft) {
      p.side = Side.left;
      leftCounter += 1;
      return p;
    }

    p.side = Side.right;
    rightCounter += 1;

    return p;
  });
  return { participants: arrangedParticipants, leftCounter, rightCounter };
};

const equalizeSidesQuantity = ({
  participants,
  leftCounter,
  rightCounter,
}: PipeArgs) => {
  const arrangedParticipants = deepCopyArray<Participant>(participants);

  let participantIndex = arrangedParticipants.length - 1;

  while (leftCounter !== rightCounter) {
    if (leftCounter > rightCounter) {
      if (arrangedParticipants[participantIndex].side === Side.left) {
        arrangedParticipants[participantIndex].side = Side.right;

        rightCounter += 1;
        leftCounter -= 1;
      }
    } else if (leftCounter < rightCounter) {
      if (arrangedParticipants[participantIndex].side === Side.right) {
        arrangedParticipants[participantIndex].side = Side.left;

        leftCounter += 1;
        rightCounter -= 1;
      }
    }

    participantIndex -= 1;
  }

  return arrangedParticipants;
};

export const arrangeParticipants = (participantsFromArgs: Participant[]) => {
  const participants = deepCopyArray<Participant>(participantsFromArgs);

  let { leftCounter, rightCounter } = countLeftAndRightSides(participants);

  const arrangedParticipants = pipe(
    { participants, leftCounter, rightCounter },
    divideNeutralParticipantsBetweenTwoSides,
    equalizeSidesQuantity,
  );

  return arrangedParticipants;
};

export const createSides = (participants: Participant[]) => {
  const sides = participants.reduce<ArrangedParticipants>(
    (acc, p) => {
      if (p.side === Side.left) {
        acc.left.push(p);
      } else {
        acc.right.push(p);
      }
      return acc;
    },
    { left: [], right: [] },
  );

  return sides;
};
