import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/LoadingBlack"; // Impor komponen Loading

const ProductList = () => {
  const getShortName = (name) => {
    const words = name.split(" ");
    return words.length > 2 ? `${words.slice(0, 2).join(" ")}...` : name;
  };

  const [bundling, setBundling] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state untuk loading

  useEffect(() => {
    const fetchBundling = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/produk-bundlings"
        );
        setBundling(response.data.bundlings);
        setLoading(false); // Setelah data ter-load, set loading menjadi false
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false); // Set loading false jika terjadi error
      }
    };
    fetchBundling();
  }, []);

  if (loading) {
    return <Loading />; // Tampilkan loading jika data sedang di-fetch
  }

  return (
    <div className="custom-grid" style={{width: "70%"}}>
      {bundling.map((bundle) => (
        <div key={bundle.id} className="custom-container-product" >
          <img
            src={`http://127.0.0.1:8000/${bundle.foto_bundle[0]}`}
            alt={bundle.nama_bundle}
          />
          <div className="custom-card-body">
            <h3>{bundle.nama_bundle}</h3>
            <p className="nama-product">{getShortName(bundle.nama_bundle)}</p>
            <p>{bundle.harga_bundle}</p>
          </div>
          <Link
            to={`/infobundling/${bundle.id}`}
            className="custom-detail-produk"
          >
            <div className="custom-card-footer">Lihat Produk</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
