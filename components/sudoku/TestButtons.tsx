import React, { useState } from "react";
import { deepCopy } from "../../utils/deepCopy";
import { sleep } from "../../utils/sleep";
import { compare } from "../../utils/sudoku/compare";
import { emptySudokuBoard } from "../../utils/sudoku/emptySudokuBoard";
import { solveSudokuInstant } from "../../utils/sudoku/solveSudokuInstant";
import { truthySudokuBoard } from "../../utils/sudoku/truthySudokuBoard";
import { validateBoard } from "../../utils/sudoku/validateBoard";
import { completedBoard, notFinished } from "../../utils/toasts/sudokuToasts";

interface GridProps {
  sudokuBoard: number[][];
  setSudokuBoard: (val: number[][]) => void;
  boardErrors?: boolean[][];
  setBoardErrors: (val: boolean[][]) => void;
}

const TestButtons = React.forwardRef(({
  sudokuBoard,
  setSudokuBoard,
  setBoardErrors,
}: GridProps, ref: any) => {
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const emptyBoard = emptySudokuBoard();

  const resetBoard = (): void => {
    setGameRunning(false);
    setSudokuBoard(emptyBoard);
    setBoardErrors(truthySudokuBoard());
    resetTiles();
  };

  const resetTiles = async (): Promise<void> => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        await sleep(1);
        ref.current[i][j].classList.remove("whiteTile");
      }
    }
  };

  const isValidSquare = (
    board: number[][],
    row: number,
    col: number,
    value: number
  ): boolean => {
    for (let i = 0; i < 9; i++) {
      const r = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const c = 3 * Math.floor(col / 3) + (i % 3);
      if (
        board[row][i] === value ||
        board[i][col] === value ||
        board[r][c] === value
      )
        return false;
    }

    return true;
  };

  const animateBoard = (row: number, col: number, value: number) => {
    ref.current[row][col].classList.toggle("whiteTile");
    ref.current[row][col].value = value;
    setTimeout(() => ref.current[row][col].classList.remove("whiteTile"), 1000)
  };

  const solveSudoku = async (board: number[][]) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          for (let k = 1; k <= 9; k++) {
            if (isValidSquare(board, i, j, k)) {
              await sleep(1);
              animateBoard(i, j, k);
              board[i][j] = k;
              if (await solveSudoku(board)) return board;
              board[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolve = async () => {
    setGameRunning(true);
    const board = deepCopy(sudokuBoard);
    if (!validBoard()) {
      setGameRunning(false);
      return;
    }
    await solveSudoku(board);
    setSudokuBoard(board);
    setGameRunning(false);
    await sleep(1000);
    await resetTiles();
  };

  const checkBoard = () => {
    if (gameRunning) return;
    const board = deepCopy(sudokuBoard);
    solveSudokuInstant(board);
    return compare(board, sudokuBoard) && validBoard()
      ? completedBoard()
      : notFinished();
  };

  const validBoard = () => {
    const board = deepCopy(sudokuBoard);
    const [status, errors] = validateBoard(board);
    const subBoardErrors = truthySudokuBoard();
    if (status) {
      setBoardErrors(subBoardErrors);
      return true;
    }
    errors.forEach((error) => {
      const [a, b] = error;
      subBoardErrors[a][b] = false;
    });
    setBoardErrors(subBoardErrors);
    return false;
  };

  return (
    <div className="flex justify-center space-x-6 items-center mt-6">
      <button
        className={`sudoku-btn bg-yellow-700 ${
          gameRunning && "cursor-not-allowed"
        }`}
        disabled={gameRunning}
        onClick={() => validBoard()}
      >
        Errors
      </button>
      <button
        className={`sudoku-btn bg-green-700 ${
          gameRunning && "cursor-not-allowed"
        }`}
        disabled={gameRunning}
        onClick={() => handleSolve()}
      >
        Solve
      </button>
      <button
        className={`sudoku-btn bg-blue-700 ${
          gameRunning && "cursor-not-allowed"
        }`}
        onClick={() => checkBoard()}
      >
        Check
      </button>
      <button
        className={`sudoku-btn bg-red-700 ${
          gameRunning && "cursor-not-allowed"
        }`}
        disabled={gameRunning}
        onClick={() => resetBoard()}
      >
        Clear
      </button>
    </div>
  );
});
export default TestButtons;
