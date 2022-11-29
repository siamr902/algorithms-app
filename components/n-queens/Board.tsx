import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { VscDebugStart } from "react-icons/vsc";
import { initialQueenBoard } from "../../utils/n-queens/initialQueenBoard";
import { deepCopy } from "../../utils/deepCopy";
import { sleep } from "../../utils/sleep";

const Board = () => {
  const [boardSize, setBoardSize] = useState<number>(6);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const initialBoard = deepCopy(initialQueenBoard(boardSize));
  const boardRef = useRef<any[][]>(initialBoard);

  useEffect(() => {
    (async function () {
      setGameRunning(false);
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          await sleep(20);
          boardRef.current[i][j].innerText = "";
          boardRef.current[i][j].classList.remove("queenValidSpot");
          boardRef.current[i][j].classList.remove("finishedBoard");
        }
      }
    })();
  }, [boardSize]);

  const generateButtons = (): React.ReactNode => {
    return Array.from({ length: 6 }, (_, i) => {
      return (
        <motion.button
          onClick={() => setBoardSize(i + 1)}
          className={`hidden sm:flex justify-center items-center ${
            gameRunning && "cursor-not-allowed"
          } text-center text-[#8B4513] text-xl font-mono w-14 h-14 py-4 px-8 bg-[#F4A460] shadow-md shadow-[#CD853F] transition duration-200 ease-out hover:opacity-70 active:scale-90 ${
            boardSize === i + 1 && "font-bold bg-[#e6954f]"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: i / 2 + 3 }}
          disabled={gameRunning}
          key={i}
        >
          {i + 1}
        </motion.button>
      );
    });
  };

  const getTileStyle = (i: number, j: number) => {
    if ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0))
      return "bg-[#e3955c]";
    return "bg-[#f4a460]";
  };

  const generateGrid = (): React.ReactNode => {
    return Array.from({ length: boardSize }, (_, i) => {
      return Array.from({ length: boardSize }, (_, j) => {
        return (
          <div
            className={`sm:w-[86px] sm:h-[70px] lg:w-24 lg:h-20 border text-5xl select-none border-[#b87333] text-black p-6 shadow-md flex items-center justify-center text-center opacity-80 transition duration-200 ease-in-out ${getTileStyle(
              i,
              j
            )}`}
            key={i + j}
            ref={(el) => (boardRef.current[i][j] = el)}
          ></div>
        );
      });
    });
  };

  const isValidPosition = async (
    row: number,
    col: number
  ): Promise<boolean> => {
    for (let j = 0; j < boardSize; j++) {
      boardRef.current[j][col].classList.add("queenPath");
      setTimeout(
        () => boardRef.current[j][col].classList.remove("queenPath"),
        100
      );
      await sleep(100);
      if (boardRef.current[j][col].innerText == "♛") return false;
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      boardRef.current[i][j].classList.add("queenPath");
      setTimeout(
        () => boardRef.current[i][j].classList.remove("queenPath"),
        100
      );
      await sleep(100);
      if (boardRef.current[i][j].innerText == "♛") return false;
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < boardSize; i--, j++) {
      boardRef.current[i][j].classList.add("queenPath");
      setTimeout(
        () => boardRef.current[i][j].classList.remove("queenPath"),
        100
      );
      await sleep(100);
      if (boardRef.current[i][j].innerText == "♛") return false;
    }
    return true;
  };

  const solveArrangements = async (row: number) => {
    if (row === boardSize) return true;

    for (let col = 0; col < boardSize; col++) {
      if (await isValidPosition(row, col)) {
        await sleep(500);
        boardRef.current[row][col].innerText = "♛";
        boardRef.current[row][col].classList.add("queenValidSpot");
        if (await solveArrangements(row + 1)) return true;
        await sleep(500);
        boardRef.current[row][col].innerText = "";
        boardRef.current[row][col].classList.remove("queenValidSpot");
      }
    }
    return false;
  };

  // row by row animation (top -> down)
  const finishedAnimation = async (row: number) => {
    if (row === boardSize) return;
    await sleep(300);
    for (let i = 0; i < boardSize; i++) {
      boardRef.current[row][i].classList.add("finishedBoard");
    }
    await finishedAnimation(row + 1);
  };

  const clearClass = async () => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        await sleep(20);
        boardRef.current[i][j].classList.remove("finishedBoard");
      }
    }
  };

  const startGame = async () => {
    setGameRunning(true);
    await solveArrangements(0);
    await finishedAnimation(0);
    setTimeout(() => clearClass(), 1500);
    setGameRunning(false);
  };

  return (
    <div className="flex flex-col space-y-10 items-center justify-center mt-5">
      <div className="flex space-x-4 items-center">{generateButtons()}</div>
      <div
        className="grid border border-[#d99058]"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        }}
      >
        {generateGrid()}
      </div>
      <button onClick={() => startGame()} disabled={gameRunning}>
        <VscDebugStart
          className={`h-11 w-11 text-[#b87333] transition active:scale-90 duration-200 ease-out ${
            gameRunning ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        />
      </button>
    </div>
  );
};

export default Board;
