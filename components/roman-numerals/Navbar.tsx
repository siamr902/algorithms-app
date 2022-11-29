import React from "react";
import { FaWikipediaW } from "react-icons/fa";
import { links } from "../../data/wikiLinks";

const Navbar = () => {
  return (
    <div className="relative text-2xl flex justify-center items-center px-5 py-4 bg-gray-900 shadow-md text-white font-mono font-semibold">
      <div>
        <span className="text-red-400 tracking-[3px] uppercase">Roman</span>{" "}
        Numerals Converter
      </div>
      <a href={links.roman} target="_blank" rel="noopener noreferrer">
        <FaWikipediaW className="hidden sm:inline-flex h-10 absolute top-3 right-6 w-10 cursor-pointer text-blue-300 hover:animate-bounce" />
      </a>
    </div>
  );
};

export default Navbar;
