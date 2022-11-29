import React from "react";
import { sortButtons } from "../../data/sortButtons";

interface Props {
  selectedBtn: string;
  setSelectedBtn: (v: string) => void;
}

const SortButtons = ({ selectedBtn, setSelectedBtn = () => {} }: Props) => {
  return (
    <div className="w-[97%] flex items-center justify-evenly space-x-5 shadow-md shadow-gray-300 p-4">
      {sortButtons.map((category) => (
        <button
          key={category}
          className={`sort-btn sort-border ${
            selectedBtn === category && "text-sky-500"
          }`}
          onClick={() => setSelectedBtn(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
