import React, { useState } from "react";
import MemoryGrid from "./MemoryGrid";

const QueueGameContainer = () => {
  const [gridSize, setGridSize] = useState<string>("25");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
  };

  const validSize = (val: string): boolean => {
    return !/[^\d+]/.test(val) && +val <= 144;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const integerValue = value.replace(/^0+/g, "");
    if (!validSize(integerValue)) return;
    setGridSize(integerValue);
  };

  return (
    <>
      <div className="flex justify-center font-serif items-center mt-6">
        <form
          onSubmit={handleSubmit}
          className="text-white font-semibold rounded-full shadow-md shadow-black p-3 w-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex flex-grow items-center bg-gray-800"
        >
          <input
            type="text"
            value={gridSize}
            placeholder="Max: 144"
            className="flex flex-grow w-full focus:outline-none text-center text-2xl bg-gray-800"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="flex justify-center mt-10 text-white text-2xl font-semibold flex-col items-center gap-4 m-10">
        <MemoryGrid gridSize={gridSize} />
      </div>
    </>
  );
};

export default QueueGameContainer;
