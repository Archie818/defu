import { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainPage from "@/components/MainPage";

const Home: NextPage = () => {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Defu</title>
      </Head>
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
};

export default Home;
