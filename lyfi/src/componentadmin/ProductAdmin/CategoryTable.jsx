import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/LoadingTable";

const CategoryTable = ({ categories, handleDeleteCategory }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setLoading(false);
    }
  }, [categories]);

  return (
    <div>
      <Table
        responsive
        className="custom-table table-responsive mt-5"
        style={{ borderRadius: "20px" }}
      >
        <thead>
          <tr>
            <th className="text-center">Nama Kategori</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="2" className="text-center">
                <Loading />
              </td>
            </tr>
          ) : categories.length > 0 ? (
            categories.map((catItem, index) => (
              <tr key={index}>
                <td className="text-center text-light">
                  {catItem.nama_kategori}
                </td>
                <td className="text-center" style={{ width: "20%" }}>
                  <Link to={`/admin/editcategory/${catItem.id}`}>
                    <Button className="button-aksi" size="sm">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </Button>{" "}
                  </Link>
                  <Button
                    className="button-aksi"
                    size="sm"
                    onClick={() => handleDeleteCategory(catItem)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center text-light">
                Tidak ada kategori yang tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryTable;
