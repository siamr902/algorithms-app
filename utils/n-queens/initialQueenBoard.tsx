export const initialQueenBoard = (size: number) => {
  return Array.from({ length: size }, (_) => {
    return Array.from({ length: size }, (_) => {
      return "a";
    });
  });
};
