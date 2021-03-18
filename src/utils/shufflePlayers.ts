function shuffleArray<T>(state: T[]): T[] {
  const newState = [...state];

  newState.sort(() => Math.random() - 0.5);
  return newState;
}

export default shuffleArray;
