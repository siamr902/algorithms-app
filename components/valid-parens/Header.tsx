import React from "react";
import { HiHome } from "react-icons/hi";
import { useRouter } from "next/router";
import { BsQuestionLg } from "react-icons/bs";
import { links } from "../../data/wikiLinks";

const Header = () => {
  const router = useRouter();
  return (
    <div className="relative w-full bg-transparent flex justify-center items-center px-4 py-6">
      <div className="font-kalam font-semibold text-4xl tracking-widest text-white">
        [ [ Valid<span className="text-gray-200">? ) ] ]</span>
      </div>
      <div onClick={() => router.push("/")} className="absolute top-3 left-8">
        <HiHome className="w-12 h-12 text-gray-100 hover:scale-90 active:scale-100 transition duration-150 ease-out hover:brightness-125 cursor-pointer" />
      </div>
      <div className="absolute top-3 right-8">
        <a href={links.stack} target="_blank" rel="noopener noreferrer">
          <BsQuestionLg className="w-10 h-10 cursor-pointer hover:scale-90 transition duration-100 ease-out text-white" />
        </a>
      </div>
    </div>
  );
};

export default Header;
