import { isValidSquare } from "./isValidSquare";

export const solveSudokuInstant = (board: number[][]) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          if (isValidSquare(board, i, j, k)) {
            board[i][j] = k;
            if (solveSudokuInstant(board)) return board;
            board[i][j] = 0;
          }
        }
        return false
      }
    }
  }
  return true
};
