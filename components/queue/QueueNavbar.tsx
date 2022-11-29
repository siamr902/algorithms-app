import { useRouter } from "next/router";
import React from "react";
import { AiFillHome } from "react-icons/ai";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="text-white w-full flex p-4 justify-center items-center font-kalam">
      <div className="font-semibold text-4xl">
        Queue
        <span className="text-pink-500 cursor-pointer hover:text-gray-400 transition duration-150 ease-out">
          Memorization
        </span>
        Game
      </div>
      <div className="ml-auto" onClick={() => router.push("/")}>
        <AiFillHome className="h-10 w-10 cursor-pointer text-gray-100 hover:scale-90 active:scale-100 tranistion duration-150 ease-out" />
      </div>
    </div>
  );
};

export default Navbar;
