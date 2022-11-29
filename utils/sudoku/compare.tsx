export const compare = (board1: number[][], board2: number[][]): boolean => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board1[i][j] !== board2[i][j]) return false;
    }
  }
  return true;
};
