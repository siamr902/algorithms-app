import React from "react";
import Board from "../../components/n-queens/Board";
import Header from "../../components/n-queens/Header";

const NQueens = () => {
  return (
    <div className="h-screen bg-gradient-to-tl from-[#DEB887] to-[#F4A460] pb-10 scrollbar-thin scrollbar-track-[#862929] scrollbar-thumb-white">
      <Header />
      <Board />
    </div>
  );
};

export default NQueens;
