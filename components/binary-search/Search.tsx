import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  inputValue: string;
}

const Search = ({ inputValue }: Props) => {
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [mid, setMid] = useState<number>(Infinity);
  const [bounds, setBounds] = useState<{ lower: number; upper: number }>({
    lower: 0,
    upper: parseInt(inputValue) || 100,
  });

  useEffect(() => {
    const upperRange = parseInt(inputValue);
    setBounds((prev) => ({ ...prev, upper: upperRange || 100 }));
  }, [inputValue]);

  useEffect(() => {
    handleMid();
  }, [bounds]);

  useEffect(() => {
    checkComplete();
  }, [mid]);

  const handleStart = () => {
    handleMid();
    setGameRunning(true);
  };

  const handleMid = () => {
    const mid = Math.floor((bounds.lower + bounds.upper) / 2);
    setMid(mid);
  };

  const handleGreater = () => {
    setBounds((prev) => ({ ...prev, lower: mid + 1 }));
  };

  const handleLess = () => {
    setBounds((prev) => ({ ...prev, upper: mid - 1 }));
  };

  const checkComplete = () => {
    if (!gameRunning) return;
    if (bounds.lower === bounds.upper) handleCorrect();
  };

  const handleCorrect = () => {
    toast(`Your number is ${mid}!`, {
      pauseOnHover: false,
      theme: "dark",
      position: "top-center",
      type: "info",
      autoClose: 2000,
    });
    setGameRunning(false);
    setBounds({ lower: 0, upper: parseInt(inputValue) || 100 });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {gameRunning ? (
        <div className="flex flex-col space-y-4">
          <div className="text-3xl font-kalam text-white text-center">
            Is your number {mid}?
          </div>
          <div className="flex space-x-5 items-center justify-center">
            <button className="binary-btn bg-red-600" onClick={handleLess}>
              Less
            </button>
            <button className="binary-btn bg-blue-600" onClick={handleCorrect}>
              Correct
            </button>
            <button className="binary-btn bg-green-600" onClick={handleGreater}>
              Greater
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-gray-900 w-24 text-center hover:scale-95 active:scale-90 px-4 py-3 text-[24px] text-white tracking-wide rounded-lg uppercase font-kalam transition duration-200 ease-in-out flex justify-center items-center"
          onClick={handleStart}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default Search;
