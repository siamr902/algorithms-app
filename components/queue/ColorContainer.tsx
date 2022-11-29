import React from "react";

interface ColorProps {
  color: string;
  id: number;
  selected: number;
  setSelected: (val: number) => void;
}

const ColorContainer = ({ color = "blue", id, selected, setSelected = () => {} }: ColorProps) => {
  return (
    <div
      className={`h-10 w-10 cursor-pointer brightness-125 hover:scale-105 transition duration-150 ease-out rounded-full ${
        selected === id && "border-2 border-black"
      }`}
      style={{ backgroundColor: color }}
      onClick={() => setSelected(id)}
    ></div>
  );
};

export default ColorContainer;
