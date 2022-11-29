const max = 1000;
const min = 1;

export const randomNumber = () => {
  return Math.floor(Math.random() * (max - min) + min);
};
