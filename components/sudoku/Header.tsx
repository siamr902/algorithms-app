import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full p-4 bg-gray-800 flex justify-between items-center">
      <div className="font-cursive text-5xl font-semibold text-white">Sudoku</div>
      <div onClick={() => router.push("/")}>
        <AiOutlineHome className="w-11 h-11 cursor pointer text-gray-100 hover:scale-90 active:scale-100 transition duration-150 ease-out hover:brightness-125 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
