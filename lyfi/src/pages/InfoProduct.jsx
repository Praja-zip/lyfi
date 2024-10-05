import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/LandingPage/Footer";
import ImageProduct from "../components/InfoProduct/ImageProduct";
import DetailProduct from "../components/InfoProduct/DetailProduct";
import Product from "../components/LandingPage/Product";
import Loading from "./../components/Loading/Loading";
import { useParams } from "react-router-dom";
import axios from "axios";

const InfoProduct = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    nama_produk: "",
    harga_produk: "",
    detail_produk: "",
    bahan_produk: "",
    cara_pemakaian: "",
    kategori: "", // Updated to a single category
    redirect: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/master-products/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data.data);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, token]);

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
          <div className="container-info-product text-center">
            <div className="row">
              <div className="col">
                <ImageProduct product={product} />
              </div>
              <div className="col">
                <DetailProduct products={product} />
              </div>
            </div>
          </div>
          <Product />
          <Footer />
        </>
      )}
    </>
  );
};

export default InfoProduct;
