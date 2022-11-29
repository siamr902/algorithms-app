import { romans } from "../../data/romans";

export const convertNumToRomanArray = (num: number = 3999): number[] => {
  let result = [];

  for (const roman in romans) {
    while (num >= romans[roman as keyof typeof romans]) {
      result.push(romans[roman as keyof typeof romans])
      num -= romans[roman as keyof typeof romans];
    }
  }

  return result;
};

export const convertNumToRomain = (num: number): string => {
  let result = "";

  for (const roman in romans) {
    while (num >= romans[roman as keyof typeof romans]) {
      result += roman;
      num -= romans[roman as keyof typeof romans];
    }
  }

  return result;
};
