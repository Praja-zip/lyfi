import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import "./AddProduct.css";

const ProductTable = ({ allProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  console.log("ini dari table", allProducts);

  // Memastikan allProducts ada sebelum slicing
  const currentItems = allProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];

  const totalPages = Math.ceil(allProducts?.length / itemsPerPage) || 1;

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="table-container">
      {/* Tabel Produk */}
      <div className="table-responsive">
        <Table className="custom-table" style={{ borderRadius: "20px" }}>
          <thead>
            <tr>
              <th className="text-center">Nama Produk</th>
              <th className="text-center">Harga Produk</th>
              <th className="text-center">Detail Produk</th>
              <th className="text-center">Foto Produk</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={index}>
                <td className="text-center text-light">{product.nama_produk}</td>
                <td className="text-center text-light">{product.harga_produk}</td>
                <td className="text-center text-light" style={{ width: "40%" }}>
                  {product.detail_produk.length > 5
                    ? product.detail_produk.split(" ").slice(0, 5).join(" ") + "..."
                    : product.detail_produk}
                </td>
                <td className="text-center">
                <img
                    src={`http://127.0.0.1:8000/storage/images/${product.foto_produk}`}
                    alt={product.nama_produk}
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td className="text-center" style={{ width: "20%" }}>
                  <Button size="sm">
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Button>{" "}
                  <Button size="sm">
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default ProductTable;
