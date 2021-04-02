import { Game } from 'src/types/main.types';
import { Tree } from './gamesForSetup.util';

export const generateListFromTree = (tree: Tree): Game[] => {
  const arrayOfNode: Tree[] | undefined = [];
  const result: Game[] = [];

  arrayOfNode.push(tree);
  while (arrayOfNode.length > 0) {
    const current = arrayOfNode.shift();
    if (current) {
      result.push(current.game);
      if (current.first) {
        arrayOfNode.push(current.first);
      }

      if (current.second) {
        arrayOfNode.push(current.second);
      }
    }
  }
  return result;
};
