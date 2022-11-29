import { useRouter } from "next/router";
import React from "react";
import { AiFillHome } from "react-icons/ai";

const Header = () => {
  const router = useRouter();
  return (
    <div className="bg-transparent flex justify-between p-6 items-center">
      <div className="text-white text-3xl font-kalam italic">
        Guessing Your Number in{" "}
        <span
          className="text-fuchsia-300 cursor-alias"
        >
          O(logN)
        </span>{" "}
        Time
      </div>
      <AiFillHome
        className="w-11 h-11 text-white cursor-pointer hover:scale-90 transition duration-200 ease-out"
        onClick={() => router.push("/")}
      />
    </div>
  );
};

export default Header;
