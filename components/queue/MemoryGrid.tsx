import React, { useState } from "react";
import { colors } from "../../data/colors";
import ColorContainer from "./ColorContainer";

interface GridProps {
  gridSize: number | string;
}

const MemoryGrid = ({ gridSize }: GridProps) => {
  const [selected, setSelected] = useState<number>(0);
  const [selectedTiles, setSelectedTiles] = useState<HTMLDivElement[]>([]);
  const [gameRunning, setGameRunning] = useState<boolean>(false);

  const handleClick = (e: any): void => {
    if (e.target.style.backgroundColor) {
      e.target.style.backgroundColor = "";
      return;
    }

    e.target.style.backgroundColor = colors[selected];
    setSelectedTiles((prev) => [e.target, ...prev]);
  };

  const checkInteger = (n: number): boolean => Number.isInteger(Math.sqrt(n));

  const generateTile = () => {
    return (
      <div
        className={`h-20 w-20 border border-gray-500 cursor-pointer`}
        onClick={handleClick}
      ></div>
    );
  };

  const startGame = (): void => {
    if (!selectedTiles.length) return;

    setGameRunning(true);
    const gameInterval = setInterval(() => {
      const tile = selectedTiles.pop();
      if (tile) tile.style.backgroundColor = "";
      if (!selectedTiles.length) {
        clearInterval(gameInterval);
        setGameRunning(false);
      }
    }, 1000);
  };

  const clearBoard = (): void => {
    for (const tile of selectedTiles) {
      tile.style.backgroundColor = "";
    }
    setGameRunning(false);
  };

  return (
    <>
      {gridSize ? (
        <div className="flex justify-center items-center flex-col">
          <span className="font-kalam">Select Your Colors!</span>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color, index) => (
              <div key={color}>
                <ColorContainer
                  color={color}
                  id={index}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className={`${gridSize ? "flex" : "hidden"} space-x-6 font-kalam`}>
        <button
          className={`${
            gameRunning ? "text-gray-600" : "text-green-500"
          } rounded-full p-4 hover:scale-105`}
          onClick={() => startGame()}
          disabled={gameRunning}
        >
          Start!
        </button>
        <button
          className="text-red-500 rounded-full p-4 hover:scale-105"
          onClick={() => clearBoard()}
        >
          Reset
        </button>
      </div>
      <div
        className={`${
          checkInteger(Number(gridSize)) ? "grid" : "flex"
        } flex-wrap max-w-7xl`}
        style={{
          gridTemplateColumns: `repeat(${Math.sqrt(Number(gridSize))}, 1fr)`,
        }}
      >
        {Array.from({ length: Number(gridSize) }, (_, i) => (
          <div key={i ** 3} className="border">{generateTile()}</div>
        ))}
      </div>
    </>
  );
};

export default MemoryGrid;
