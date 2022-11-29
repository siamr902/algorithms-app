import React, { useState } from "react";
import Grid from "./Grid";

const SizeInput = () => {
  const [size, setSize] = useState<number>(5);
  const [gameRunning, setGameRunning] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/[^123456789+]/.test(input)) return;
    if (Number(input) > 5) return;
    setSize(Number(input));
  };

  return (
    <div className="w-full flex justify-center items-center flex-col mt-5">
      <input
        type="text"
        className="w-[25%] px-5 py-3 outline-none text-center text-xl font-kalam border-b-[3px] border-gray-400 bg-[#202A44]"
        placeholder="Enter dimension 1 <= x <= 5"
        onChange={handleChange}
        maxLength={2}
        disabled={gameRunning}
        value={size || ""}
      />
      <Grid size={size} gameRunning={gameRunning} setGameRunning={setGameRunning} />
    </div>
  );
};

export default SizeInput;
