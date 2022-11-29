export const emptySudokuBoard = (): number[][] => {
  return Array.from({ length: 9 }, (_) => {
    return Array.from({ length: 9 }, (_) => {
      return 0;
    });
  });
};


