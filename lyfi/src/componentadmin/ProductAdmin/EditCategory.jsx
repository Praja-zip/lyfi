import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditCategories = ({ category, setCategory, handleSubmit }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    console.log("Submit button clicked");
    console.log("Category value:", category);

    handleSubmit(); 

    setMessage("Kategori berhasil diedit!");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="addproduct text-start mt-5">
      <div className="header-addproduct">
        <h1>Edit Kategori</h1>
      </div>

      {/* Notifikasi */}
      {showNotification && (
        <div className="notification-popup">
          <p className="notification-message">{message}</p>
        </div>
      )}

      <div className="form-addproduct">
        <div className="addproduct-input row">
          <label htmlFor="addproduct">Nama Kategori :</label>
          <input
            type="text"
            placeholder="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <button
        className="addproduct-save d-flex justify-content-center align-items-center"
        onClick={onSubmit}
      >
        <i className="fa-regular fa-floppy-disk me-2"></i>{" "}
        <span className="d-none d-md-block">Save Changes</span>
      </button>

      <Link to="/admin/productadmin">
        <button className="addproduct-back d-flex justify-content-center align-items-center mt-3">
          <i className="fa-regular fa-circle-left me-2"></i>{" "}
          <span className="d-none d-md-block">Kembali</span>
        </button>
      </Link>
    </div>
  );
};

export default EditCategories;
