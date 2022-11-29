import Head from "next/head";
import React from "react";
import Header from "../../components/min-cost-path/Header";
import SizeInput from "../../components/min-cost-path/SizeInput";

const MinCostPath = () => {
  return (
    <div className="h-screen bg-[#202A44] scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-black pb-10">
      <Head>
        <title>Minimum Cost Path</title>
        <link rel="shortcut icon" href="/algo-logo.png" />
      </Head>
      <Header />
      <SizeInput />
    </div>
  );
};

export default MinCostPath;
