import React, { useState, useEffect } from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/LandingPage/Footer";
import Header from "./../components/Bundling/Header";
import BundlingList from "./../components/Bundling/BundlingList";
import "./../components/Bundling/Bundling.css";
import Loading from "../components/Loading/Loading";
const Bundling = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false);
    };
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Header />
          <BundlingList />
          <Footer />
        </>
      )}
    </>
  );
};
export default Bundling;
