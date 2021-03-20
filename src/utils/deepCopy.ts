function deepCopyArray<T>(array: T[]): T[] {
  return JSON.parse(JSON.stringify(array));
}

export default deepCopyArray;
