import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

const BundlingTable = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filter] = useState("");

  const filteredProducts = products.filter((product) =>
    product.category.includes(filter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      {/* Tabel Produk */}
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
          {currentItems.map((product, index) => (
            <tr key={index}>
              <td className="text-center text-light">{product.name}</td>
              <td className="text-center text-light">{product.price}</td>
              <td className="text-center text-light" style={{ width: "40%" }}>
                {product.details.split(" ").slice(0, 5).join(" ") + "..."}
              </td>
              <td className="text-center">
                <img
                  src={product.image}
                  alt={product.name}
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

export default BundlingTable;
