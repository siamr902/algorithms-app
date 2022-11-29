import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiOutlineSun } from "react-icons/hi";

const Header = () => {
  const router = useRouter();
  const { setTheme } = useTheme();

  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleClick = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="relative z-50 text-4xl w-full flex dark:text-white font-semibold bg-gray-100 dark:bg-[#0c111d] px-5 py-4 justify-center shadow-lg dark:shadow-md dark:shadow-gray-900 font-kalam">
      <motion.div
        className="tracking-widest select-none"
        onClick={() => router.push("/")}
        animate={{ opacity: 1, x: [-40, 40, -20, 20, -10, 10, 0] }}
        initial={{ opacity: 0 }}
        transition={{ delay: 1, duration: 2, type: "spring", damping: 100 }}
      >
        Algorithms
        <span className="text-2xl align-super text-pink-500 hover:brightness-200">
          Visualized
        </span>
      </motion.div>
      <motion.div
        className="hidden sm:inline-flex absolute top-4 right-8"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <motion.button onClick={handleClick} whileTap={{ scale: 0.9 }}>
          {!darkMode ? (
            <HiOutlineSun className="h-10 w-10" />
          ) : (
            <BsFillMoonStarsFill className="h-10 w-8 text-gray-200 hover:brightness-150" />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Header;
