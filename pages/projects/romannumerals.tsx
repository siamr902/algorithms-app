import React, { useState } from "react";
import { convertNumToRomain, convertNumToRomanArray } from "../../utils/roman/convertNumToRoman";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import { FaClipboard } from "react-icons/fa";
import Head from "next/head";

const RomanNumerals = () => {
  const [input, setInput] = useState<string>("");
  const [roman, setRoman] = useState<string>("");
  
  const [romanIntegers, setRomanIntegers] = useState<number[]>([]);
  const [romanDisplay, setRomanDisplay] = useState<boolean>(true);

  const router = useRouter();

  const copyToClipBoard = (): void => {
    navigator.clipboard.writeText(roman);
    toast("Copied", {
      type: "success",
      theme: "dark",
      hideProgressBar: true,
      autoClose: 2000,
    });
  };

  const toastError = (): void => {
    toast("Input can only contain numbers", {
      type: "error",
      theme: "dark",
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
    });
    clearWaitingQueue();
  };

  const toastLengthError = (): void => {
    toast("Value must be within boundaries", {
      type: "error",
      theme: "dark",
      position: "top-center",
      hideProgressBar: true,
      autoClose: 1000,
    });
    clearWaitingQueue();
  };

  const clearWaitingQueue = () => {
    toast.clearWaitingQueue();
  };

  const validString = (value: string): boolean => {
    if (/[^\d+]/.test(value)) return false;
    return true;
  };

  const expandIntegerDisplay = () => {
    return romanIntegers.join(" + ")
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (!validString(value)) return toastError();
    if (Number(value) > 3999 || Number(value) < 0) return toastLengthError();

    setInput(value);
    setRoman(convertNumToRomain(Number(value)));
    setRomanIntegers([...convertNumToRomanArray(Number(value))]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Head>
        <title>Roman Numeral Converter</title>
        <link rel="shortcut icon" href="/algo-logo.png" />
      </Head>
      <div className="relative text-2xl flex justify-center items-center px-5 py-4 bg-gray-900 text-white font-kalam font-semibold">
        <div className="text-3xl">
          <span className="text-red-400 tracking-[3px] uppercase hover:brightness-125 cursor-pointer hover:tracking-[5px]">Roman</span>{" "}
          Numerals Converter
        </div>
        <div onClick={() => router.push("/")}>
          <AiFillHome className="h-10 absolute top-3 left-6 w-10 cursor-pointer text-white hover:scale-105 transition duration-100 ease-out" />
        </div>
      </div>
      <ToastContainer limit={3} />
      <div className="flex justify-center mt-40 mb-20 font-kalam items-center">
        <form
          onSubmit={handleSubmit}
          className="rounded-full shadow-lg p-4 w-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex flex-grow items-center bg-white"
        >
          <input
            type="text"
            value={input}
            placeholder="1 - 3999"
            className="flex flex-grow w-full focus:outline-none text-center text-2xl dark:bg-white dark:text-black"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="text-black font-kalam font-semibold flex justify-center">
        {input && (
          <div className="flex flex-col items-center space-y-10 transition-all">
            <div className="group text-3xl text-amber-600 cursor-pointer flex gap-4 items-center brightness-150">
              <span
                className={`${romanDisplay && "group-hover:animate-pulse"}`}
                onClick={() => setRomanDisplay((prev) => !prev)}
              >
                {romanDisplay ? roman : expandIntegerDisplay()}
              </span>
              <span>
                <FaClipboard
                  className="w-6 h-6 cursor-pointer text-white"
                  onClick={() =>copyToClipBoard()}
                />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RomanNumerals;
