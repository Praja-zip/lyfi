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
    kategori: "",
    redirect: "",
    foto_produk: [], // Tambahkan default foto_produk sebagai array kosong
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
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

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
                <DetailProduct product={product} />
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
