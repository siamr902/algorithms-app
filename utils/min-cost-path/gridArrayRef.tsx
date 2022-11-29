export const initalGrid = (size: number): number[][] => {
  return Array.from({ length: size }, (_) => {
    return Array.from({ length: size }, (_) => {
      return 0;
    });
  });
};
