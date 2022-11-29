import Head from "next/head";
import React from "react";
import QueueGameContainer from "../../components/queue/QueueGameContainer";
import QueueNavbar from "../../components/queue/QueueNavbar";

const MemoryGame = () => {

  return (
    <div className="bg-gray-900 h-screen flex flex-col scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-900">
      <Head>
        <title>Queue Memorization Game</title>
        <link rel="shortcut icon" href="/algo-logo.png" />
      </Head>
      <QueueNavbar />
      <QueueGameContainer />
    </div>
  );
};

export default MemoryGame;
