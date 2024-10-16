import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/LoadingTable"; // Import komponen Loading

const BundlingTable = ({ products, handleDeleteBundling, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Memastikan products ada sebelum slicing
  const currentItems =
    products?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <Table
        responsive
        className="custom-table table-responsive"
        style={{ borderRadius: "20px" }}
      >
        <thead>
          <tr>
            <th className="text-center">Nama Bundling</th>
            <th className="text-center">Harga</th>
            <th className="text-center">Detail</th>
            <th className="text-center">Foto</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">
                <Loading /> {/* Tampilkan loading saat data belum siap */}
              </td>
            </tr>
          ) : currentItems.length > 0 ? (
            currentItems.map((product, index) => (
              <tr key={index}>
                <td className="text-center text-light">
                  {product.nama_bundle}
                </td>
                <td className="text-center text-light">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(product?.harga_bundle || 0)}
                </td>
                <td className="text-center text-light" style={{ width: "40%" }}>
                  {product.detail_bundle.split(" ").slice(0, 5).join(" ") +
                    "..."}
                </td>
                <td className="text-center">
                  <img
                    src={`http://127.0.0.1:8000/${product.foto_bundle[0]}`}
                    alt={product.nama_bundle}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>
                <td className="text-center d-flex align-items-center justify-content-center" style={{ width: "100%", height: "6.5rem" }}>
                  <Link
                    to={`/admin/editbundling/${product.id}`}
                    className="mx-1 text-decoration-none"
                  >
                    <Button
                      className="button-aksi d-flex align-items-center justify-content-center"
                      size="sm"
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </Button>
                  </Link>
                  <Button
                    className="button-aksi d-flex align-items-center justify-content-center"
                    size="sm"
                    onClick={() => handleDeleteBundling(product)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-light">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {products.length > 0 && (
        <div className="pagination-container">
          <Button
            className="pagination-btn text-dark"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </Button>
          <div className="pagination-scroll">
            {Array(totalPages)
              .fill()
              .map((_, i) => (
                <Button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`pagination-number ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
          </div>
          <Button
            className="pagination-btn text-dark"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </Button>
        </div>
      )}
    </div>
  );
};

export default BundlingTable;
