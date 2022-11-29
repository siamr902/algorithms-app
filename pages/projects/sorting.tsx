import React from "react";
import Header from "../../components/sorting/Header";
import SortContainer from "../../components/sorting/SortContainer";

const Sorting = () => {
  return (
    <div className="h-screen scrollbar-track-slate-500 scrollbar-thumb-slate-200">
      <Header />
      <SortContainer />
    </div>
  );
};

export default Sorting;
