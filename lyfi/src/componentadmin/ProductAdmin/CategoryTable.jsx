import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryTable = ({ category }) => {
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
            <th className="text-center">Nama Kategori</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {category.map((catItem, index) => (
            <tr key={index}>
              <td className="text-center text-light">{catItem.name}</td>
              <td className="text-center" style={{ width: "20%" }}>
                <Link to="/admin/editcategory">
                  <Button className="button-aksi" size="sm">
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Button>{" "}
                </Link>
                <Button className="button-aksi" size="sm">
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryTable;
