export const isValidSquare = (
  board: number[][],
  row: number,
  col: number,
  value: number
): boolean => {
  for (let i = 0; i < 9; i++) {
    const r = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const c = 3 * Math.floor(col / 3) + (i % 3);
    if (board[row][i] === value || board[i][col] === value || board[r][c] === value)
      return false;
  }

  return true;
};
