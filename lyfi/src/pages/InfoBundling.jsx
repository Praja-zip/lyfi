import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios"; // Pastikan axios diimpor
import Navbar from "../components/Navbar";
import Footer from "../components/LandingPage/Footer";
import DetailProduct from "../components/InfoProduct/DetailBundling";
import Product from "../components/LandingPage/Product";
import Loading from "../components/Loading/Loading";
import { useParams } from "react-router-dom";
import ImageBundling from "../components/infoBundling/ImageBundling";

const InfoBundling = () => {
  const { id } = useParams();
  console.log("ini adlaah bundling", id)
  const [loading, setLoading] = useState(true);
  const [bundling, setBundling] = useState({}); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBundling = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/produk-bundlings/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("ini dari info bundling",response.data.bundling); // Gunakan 'data' sesuai dengan respons dari server
        setBundling(response.data.bundling);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBundling();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="container-info-product text-center">
            <div className="row">
              <div className="col">
                <ImageBundling product={bundling} />
              </div>
              <div className="col">
                <DetailProduct bundling={bundling} />
              </div>
            </div>
          </div>
          {/* <Product /> */}
          <Footer />
        </>
      )}
    </>
  );
};

export default InfoBundling;
