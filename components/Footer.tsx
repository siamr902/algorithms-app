import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineCopyright } from "react-icons/ai";

type LinkProps = {
  gitHubLink?: string;
  gitHubRepoLink?: string
};

const Footer = ({ gitHubLink, gitHubRepoLink }: LinkProps) => {
  return (
    <footer className="relative w-full flex justify-center p-5 items-center dark:bg-[#0c111d] dark:text-white font-kalam font-semibold transition duration-200 ease-in-out shadow-xl shadow-black text-center">
      <div className="text-3xl flex space-x-3 justify-center pb-1">
        <div className="tracking-widest">Creator:</div>
        <div className="cursor-pointer hover:scale-95 hover:text-blue-400 text-red-400 dark:text-red-300 transition duration-200 ease-in-out">
          <a href={gitHubLink} target="_blank" rel="noopener noreferrer">
            Siam Rahman
          </a>
        </div>
      </div>
      <div className="absolute right-8 top-[50%] -translate-y-[60%]">
        <a href={gitHubRepoLink} target="_blank" rel="noopener noreferrer">
          <AiFillGithub className="hidden md:inline-flex cursor-pointer w-10 h-10 hover:rotate-45 transition duration-200 active:scale-105" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
