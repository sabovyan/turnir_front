interface IScoreCounter {
  firstScore: number;
  secondScore: number;
}

export const countVictories = (
  firstScore: number[],
  secondScore: number[],
): IScoreCounter => {
  const victories = firstScore.reduce<IScoreCounter>(
    (acc, el, idx) => {
      if (el > secondScore[idx]) {
        acc.firstScore += 1;
        return acc;
      }

      if (el < secondScore[idx]) {
        acc.secondScore += 1;
        return acc;
      }

      return acc;
    },
    { firstScore: 0, secondScore: 0 },
  );

  return victories;
};
