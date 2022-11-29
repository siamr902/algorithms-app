import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import ProjectContainer from "../components/ProjectContainer";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <div className="mx-auto ">
      <Head>
        <title>Mini-Algorithm Collection</title>
      </Head>

      <header className="sticky top-0 z-50">
        <Header />
      </header>

      <ProjectContainer />

      <Footer
        gitHubLink="https://github.com/siamr902"
        gitHubRepoLink="https://github.com/siamr902?tab=repositories"
      />
    </div>
  );
};

export default Home;
