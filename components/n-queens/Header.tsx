import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { BsArrow90DegLeft } from "react-icons/bs";

const Header = () => {
  const router = useRouter();
  return (
    <motion.nav
      className="w-full p-6 bg-transparent flex items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 2 }}
    >
      <motion.div
        className="text-4xl font-cursive font-semibold text-[#8B4513] cursor-pointer"
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 1.2 }}
      >
        N-Queens
      </motion.div>
      <div>
        <BsArrow90DegLeft
          className="w-10 h-11 cursor-pointer hover:scale-90 active:scale-100 transition duration-200 ease-linear text-[#D2691E]"
          onClick={() => router.push("/")}
        />
      </div>
    </motion.nav>
  );
};

export default Header;
