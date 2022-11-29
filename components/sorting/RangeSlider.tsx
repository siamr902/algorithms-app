import React from "react";

interface Props {
  setSpeed: (v: number) => void;
  speed: number;
}

const RangeSlider = ({ setSpeed, speed }: Props) => {
  const handleSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Number(e.target.value);
    const max = 1000;
    setSpeed(max - speed);
  };

  return (
    <div className="flex space-x-4 w-full justify-center">
      <div className="font-kalam text-black text-2xl font-semibold">SPEED</div>
      <input
        type="range"
        className="accent-red-600 outline-none w-[50%]"
        onChange={handleSpeed}
        min={100}
        max={1000}
      />
    </div>
  );
};

export default RangeSlider;
