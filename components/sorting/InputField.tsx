import React, { ReactFragment } from "react";
import { randomizeInput } from "../../utils/sorting/randomizeInput";

interface Props {
  sortInput: string;
  gameRunning: boolean;
  setSortInput: (v: string) => void;
  setNumArray: (v: number[]) => void;
  runGame: () => void;
}

const InputField = ({
  sortInput,
  gameRunning,
  setSortInput = () => {},
  setNumArray = () => {},
  runGame = () => {}
}: Props) => {
  const handleGenerate = () => {
    const { stringInput, numArray } = randomizeInput();
    setSortInput(stringInput);
    setNumArray(numArray);
  };

  const validInput = (input: string): boolean => {
    if (input.split(",").length > 20) return false;
    if (input.split(",").some((n) => n.length > 3)) return false; // num cannot exceed 999
    if (input.split(",").some((n) => /^0{2,}/.test(n))) return false; // not more than 1 0
    if (/[^0-9,]/.test(input)) return false; // nothing but digits and "," allowed
    if (/,{2,}/.test(input)) return false; // no more than  1 comma at a time
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!validInput(value)) return;
    setSortInput(value);

    const nums = value.split(",").map(Number);
    setNumArray(nums);
  };

  return (
    <div className="w-[97%] flex items-center justify-start space-x-5 p-3">
      <button
        className={`font-kalam uppercase text-xl px-4 py-3 text-black bg-sky-300 shadow-md shadow-sky-200 bg-opacity-60 rounded-lg hover:scale-95 active:scale-100 transition duration-200 ease-out ${
          gameRunning ? "cursor-not-allowed" : ""
        }`}
        onClick={() => handleGenerate()}
        disabled={gameRunning}
      >
        Random
      </button>
      <input
        type="text"
        className={`rounded-md flex-grow px-5 py-3 outline-none font-kalam bg-gray-200 text-black text-xl tracking-widest ${
          gameRunning ? "cursor-not-allowed" : ""
        }`}
        value={sortInput}
        onChange={handleChange}
        disabled={gameRunning}
      />
        <button
          className={`font-kalam uppercase text-xl px-4 py-3 text-white bg-[#DC143C] shadow-md shadow-red-300 rounded-lg hover:scale-95 active:scale-100 transition duration-200 ease-out ${gameRunning ? "cursor-not-allowed" : ""}`}
          onClick={() => runGame()}
          disabled={gameRunning}
        >
          RUN!
        </button>
    </div>
  );
};

export default InputField;
