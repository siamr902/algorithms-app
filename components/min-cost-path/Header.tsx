import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import InfoModal from "./InfoModal";

const Header = () => {
  const router = useRouter();
  return (
    <header className="w-full bg-transparent p-6 flex items-center justify-between">
      <motion.div
        className="font-kalam text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ duration: 2, delay: 2 }}
      >
        Find the Most Inexpensive Path
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 4 }}
      >
        <div className="flex space-x-6 items-center">
          <InfoModal />
          <AiOutlineHome
            className="w-11 h-11 text-blue-400 cursor-pointer hover:scale-90 transition duration-200 ease-out"
            onClick={() => router.push("/")}
          />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
