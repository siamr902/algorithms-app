export const validateBoard = (board: number[][]): [boolean, number[][]] => {
  const set = new Set();
  const errors = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const value = board[i][j];
      if (value === 0) continue;
      const boxValue = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      const row = `row: ${i}, value:${value}`;
      const col = `col: ${j}, value: ${value}`;
      const box = `box: ${boxValue} value: ${value}`;
      if (set.has(row) || set.has(col) || set.has(box)) errors.push([i, j]);
      set.add(row);
      set.add(col);
      set.add(box);
    }
  }

  return [!errors.length, errors];

};
