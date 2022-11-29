export const emptyStringBoard = () => {
  return Array.from({ length: 9 }, (_) => {
    return Array.from({ length: 9 }, (_) => {
      return "";
    });
  });
};
