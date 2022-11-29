import React, { useRef, useState } from "react";
import { initalSudokuBoard } from "../../data/initalSudokuBoard";
import { deepCopy } from "../../utils/deepCopy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestButtons from "./TestButtons";
import { truthySudokuBoard } from "../../utils/sudoku/truthySudokuBoard";
import { errorToast } from "../../utils/toasts/sudokuToasts";

const Board: React.FC = () => {
  const [sudokuBoard, setSudokuBoard] = useState<number[][]>(
    deepCopy(initalSudokuBoard)
  );
  const [boardErrors, setBoardErrors] =
    useState<boolean[][]>(truthySudokuBoard);

  const validNumber = (value: string): boolean => {
    return !/[^\d+]/.test(value);
  };

  const sudokuRef = useRef<HTMLInputElement[][] | null[][]>([...Array(9)].map((_) => [...Array(9)]));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ri: number,
    ci: number
  ): void => {
    if (!validNumber(e.target.value)) {
      errorToast();
      return;
    }
    const grid = deepCopy(sudokuBoard);
    grid[ri][ci] = Number(e.target.value) ?? 0;
    setSudokuBoard(grid);
  };

  return (
    <div className="flex justify-center mt-8 items-center flex-col pb-10">
      <ToastContainer />
      <table className="border-separate border-spacing-[2px]">
        <tbody>
          {Array.from({ length: 9 }, (_, ri) => {
            return (
              <tr key={ri}>
                {Array.from({ length: 9 }, (_, ci) => {
                  return (
                    <td
                      key={ri + ci}
                      className={`p-0 ${
                        (ri + 1) % 3 === 0 &&
                        ri !== 8 &&
                        "border-b-[3px] border-black"
                      } ${
                        (ci + 1) % 3 === 0 &&
                        ci !== 8 &&
                        "border-r-[3px] border-black"
                      }`}
                    >
                      <input
                        className={`w-12 h-12 text-lg text-center text-white font-semibold outline-none shadow-md shadow-black ${
                          !boardErrors[ri][ci] ? "bg-red-500" : "bg-gray-900"
                        } border border-black tile_${ri}${ci}`}
                        maxLength={1}
                        value={
                          sudokuBoard[ri][ci] === 0 ? "" : sudokuBoard[ri][ci]
                        }
                        onChange={(e) => handleChange(e, ri, ci)}
                        ref={(el) => sudokuRef.current[ri][ci] = el}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TestButtons
        sudokuBoard={sudokuBoard}
        setSudokuBoard={setSudokuBoard}
        boardErrors={boardErrors}
        setBoardErrors={setBoardErrors}
        ref={sudokuRef}
      />
    </div>
  );
};

export default Board;
