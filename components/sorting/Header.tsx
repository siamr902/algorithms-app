import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const Header = () => {
  const router = useRouter();
  return (
    <nav className="w-full flex justify-between items-center p-5">
      <motion.div
        className="font-semibold font-cursive text-4xl text-black"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 1, duration: 2 }}
      >
        Sorting Visualization
      </motion.div>
      <motion.div
        animate={{ x: "-10px", opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 1, duration: 2 }}
        whileHover={{
          scale: 1.1,
          rotate: 360,
          transition: { duration: 1, type: "spring" },
        }}
      >
        <BsArrowLeft className="w-10 h-10 cursor-pointer text-black" onClick={() => router.back()}/>
      </motion.div>
    </nav>
  );
};

export default Header;
