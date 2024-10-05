import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

const PilihProduk = ({ allProducts, 
  handleProdukChange, produk, setProduk }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  console.log("ini dari table", allProducts);

  // Pastikan allproducts ada sebelum slicing
  const currentItems = allProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];

  const totalPages = Math.ceil(allProducts?.length / itemsPerPage) || 1;
  console.log(totalPages);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="table-container">
      {/* Tabel Produk */}
      <div className="table-responsive">
        <Table className="custom-table" style={{ borderRadius: "0px" }}>
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
                <td className="text-center">{product.nama_produk}</td>
                <td className="text-center">{product.harga_produk}</td>
                <td className="text-center" style={{ width: "40%" }}>
                  {product.detail_produk.split(" ").slice(0, 5).join(" ") + "..."}
                </td>
                <td className="text-center">
                  <img
                    src={`http://127.0.0.1:8000/${product.foto_produk[0]}`}
                    alt={product.nama_produk}
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td className="text-center" style={{ width: "20%" }}>
                <input type="checkbox" value={product.id} 
                id={`product-${product.id}`}
                onChange={handleProdukChange}
                checked={produk.includes(String(product.id))}
                name="pilih_produk" />
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

export default PilihProduk;
