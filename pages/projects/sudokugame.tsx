import Head from "next/head";
import React from "react";
import Board from "../../components/sudoku/Board";
import Header from "../../components/sudoku/Header";

const Sudoku = () => {
  return (
    <div className="h-screen bg-gray-800 scrollbar-thin scrollbar-track-[#333] scrollbar-thumb-white scroll-smooth">
      <Head>
        <title>Backtracking Visualization</title>
        <link rel="shortcut icon" href="/algo-logo.png" />
      </Head>
      <Header />
      <Board />
    </div>
  );
};

export default Sudoku
