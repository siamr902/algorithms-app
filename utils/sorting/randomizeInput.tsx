const MIN = 1;
const MAX = 999;
const MAX_LENGTH = 30;
const MIN_LENGTH = 10;

const randomNumber = () => Math.floor(Math.random() * (MAX - MIN)) + MIN;

export const randomizeInput = (): { stringInput: string, numArray: number[] } => {
    const inputLength =  Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH)) + MIN_LENGTH;
    const numArray = Array.from({ length: inputLength }, (_) => randomNumber());
    return {
        stringInput: numArray.map(String).join(","),
        numArray
    }
}