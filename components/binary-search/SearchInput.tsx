import React, { useState } from "react";
import Search from "./Search";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const validateNumber = (input: string): string => {
    return input.replace(/[^\d+]/, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = validateNumber(e.target.value);
    setInputValue(number);
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-10 mt-16">
      <input
        type="text"
        className="w-[50%] p-4 outline-none text-center text-xl font-kalam border-b-2 border-white bg-gray-900"
        placeholder="Input a number less than 10E+29."
        maxLength={30}
        value={inputValue}
        onChange={handleChange}
      />
      {!inputValue ? (
        <div className="text-white text-xl font-kalam">
          Characters must only include digits.
        </div>
      ) : (
        <div className="text-white text-xl font-kalam">
          Range: 0 - {inputValue}
        </div>
      )}
      <Search inputValue={inputValue}/>
    </div>
  );
};

export default SearchInput;
