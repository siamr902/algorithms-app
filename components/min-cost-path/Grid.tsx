import React, { useEffect, useRef, useState } from "react";
import { deepCopy } from "../../utils/deepCopy";
import { initalGrid } from "../../utils/min-cost-path/gridArrayRef";
import { randomNumber } from "../../utils/min-cost-path/randomNumber";
import { sleep } from "../../utils/sleep";

const Grid = ({
  size,
  gameRunning,
  setGameRunning = () => {},
}: {
  size: number;
  gameRunning: boolean;
  setGameRunning: (val: boolean) => void;
}) => {
  const [result, setResult] = useState<number>(0);
  const emptyGrid = initalGrid(size);
  const sizeArray = deepCopy(emptyGrid);
  const inputRefs = useRef<any[][]>(sizeArray);

  useEffect(() => {
    clearGrid();
  }, [size]);

  const generateRandomCosts = async () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        await sleep(50);
        inputRefs.current[i][j].value = randomNumber();
      }
    }
    setResult(0);
  };

  const clearGrid = async () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        await sleep(10);
        inputRefs.current[i][j].value = null;
        inputRefs.current[i][j].classList.remove("activePath");
      }
    }
    setResult(0);
  };

  const clearClass = async () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        await sleep(5);
        inputRefs.current[i][j].classList.remove("activePath");
        inputRefs.current[i][j].classList.remove("donePath");
      }
    }
  };

  const finishedAnimation = async () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        await sleep(10);
        inputRefs.current[i][j].classList.add("donePath");
      }
    }
    setTimeout(() => clearClass(), 500);
  };

  const generateGrid = () => {
    return (
      <tbody>
        {Array.from({ length: size }, (_, ri) => {
          return (
            <tr key={ri}>
              {Array.from({ length: size }, (_, ci) => {
                return (
                  <td key={ri + ci}>
                    <input
                      className="w-20 h-20 outline-none text-center text-lg font-semibold border border-gray-400 bg-transparent text-white transition duration-200 ease-in-out"
                      maxLength={1}
                      ref={(el) => (inputRefs.current[ri][ci] = el)}
                      onChange={(e) =>
                        (inputRefs.current[ri][ci].value = e.target.value)
                      }
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const solvePath = async (
    gridSize: number = size,
    i: number = 0,
    j: number = 0
  ): Promise<number> => {
    if (i >= gridSize || j >= gridSize) return Number.POSITIVE_INFINITY;
    if (gridSize === 1) {
      animateBoard(i, j);
      return Number(inputRefs.current[i][j].value);
    }
    if (i === gridSize - 1 && j === gridSize - 1) {
      await clearClass();
      inputRefs.current[i][j].classList.toggle("hitEnd");
      return Number(inputRefs.current[i][j].value);
    }
    await sleep(1);
    animateBoard(i, j);
    const down = await solvePath(gridSize, i + 1, j);
    const right = await solvePath(gridSize, i, j + 1);
    return Number(inputRefs.current[i][j].value) + Math.min(right, down);
  };

  const animateBoard = (i: number = 0, j: number = 0) => {
    if (inputRefs.current[i][j]) {
      inputRefs.current[i][j].classList.add("activePath");
    }
  };

  const runGame = async () => {
    setResult(0);
    setGameRunning(true);
    const value = await solvePath(size, 0, 0);
    await finishedAnimation();
    setResult(value);
    setGameRunning(false);
  };

  return (
    <div className="relative mt-5 flex items-center justify-center flex-col space-y-4">
      <div className="flex space-x-5 justify-between items-center w-full">
        <button
          className={`cost-btn from-orange-500 to-pink-400 ${gameRunning ? "cursor-not-allowed" : ""}`}
          onClick={generateRandomCosts}
          disabled={gameRunning}
        >
          Generate Random Costs
        </button>
        <button
          className={`cost-btn from-blue-500 to-fuchsia-500 rounded-lg ${gameRunning ? "cursor-not-allowed" : ""}`}
          onClick={clearGrid}
          disabled={gameRunning}
        >
          Clear Board
        </button>
      </div>
      {result !== 0 && (
        <div className="absolute top-[40%] -right-[40%] -translate-y-[50%] text-white font-kalam text-2xl">
          {result}
        </div>
      )}
      <table className="border-collapse border border-gray-500">
        {generateGrid()}
      </table>
      <button
        className={`cost-btn from-pink-300 to-red-300 text-2xl ${gameRunning ? "cursor-not-allowed" : ""}`}
        onClick={() => runGame()}
        disabled={gameRunning}
      >
        Run!
      </button>
    </div>
  );
};

export default Grid;
