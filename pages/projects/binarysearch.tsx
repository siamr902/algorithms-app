import Header from "../../components/binary-search/Header";
import SearchInput from "../../components/binary-search/SearchInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const BinarySearch = () => {
  return (
    <div className="bg-gray-900 h-screen scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-white">
      <Head>
        <title>Binary Search Game</title>
        <link rel="shortcut icon" href="/algo-logo.png" />
      </Head>
      <ToastContainer />
      <Header />
      <SearchInput />
    </div>
  );
};

export default BinarySearch;
