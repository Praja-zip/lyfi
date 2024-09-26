import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const EditProducts = ({
  product,
  allCategories,
  handleInputChange,
  handleCategoryChange,
  handleFileChange,
  handleSubmit,
  setSelectedFiles,
  selectedFiles
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  const categories = Array.isArray(product.kategoris) ? 
    product.kategoris.map(cat => cat.id) : [];

  const categoryOptions = allCategories.map(category => ({
    value: category.id,
    label: category.nama_kategori,
  }));

  const selectedCategories = categoryOptions.filter(option =>
    option.value === product.kategori
  );
  

  
  const [notification, setNotification] = useState("");

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Hapus file berdasarkan index
  };
  

  // Remove notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        setNotification("");
      }, 3000);

      return () => clearTimeout(timeoutId); // Clean up the timeout when the component unmounts or notification changes
    }
  }, [notification]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await handleSubmit(); // Ensure product contains the updated values
      setNotification("Product updated successfully!");
    } catch (error) {
      if (error.response) {
        // Log or set an error notification based on response
        setNotification("Failed to update product: " + error.response.data.message);
      } else {
        setNotification("An error occurred while updating the product.");
      }
    }
  };
  

  const handleCloseError = () => {
    setShowNotification(false); // Hide the error popup when close button is clicked
  };

  return (
    <div className="addproduct text-start mt-5">
      <form onSubmit={handleFormSubmit}>
        <div className="header-addproduct">
          <h1>Edit Produk</h1>
        </div>

        {/* Notifikasi */}
        {notification && (
          <div className="notification-popup d-flex">
            <p className="notification-message">{notification}</p>
            <button
              className="close-btn ms-4"
              onClick={() => setNotification("")}
            >
              &times;
            </button>
          </div>
        )}


        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="nama_produk">Nama Produk :</label>
            <input
              type="text"
              name="nama_produk"
              placeholder="Nama Produk"
              value={product.nama_produk}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="harga_produk">Harga Produk :</label>
            <input
              type="text"
              name="harga_produk"
              placeholder="Harga Produk"
              value={product.harga_produk}
              onChange={ handleInputChange}
            />
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="detail_produk">Detail Produk :</label>
            <input
              type="text"
              name="detail_produk"
              placeholder="Detail Produk"
              value={product.detail_produk}
              onChange={ handleInputChange}
            />
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="cara_pemakaian">Cara Pemakaian Produk :</label>
            <input
              type="text"
              name="cara_pemakaian"
              placeholder="Cara Pemakaian Produk"
              value={product.cara_pemakaian}
              onChange={ handleInputChange}
            />
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="bahan_produk">Bahan Produk :</label>
            <input
              type="text"
              name="bahan_produk"
              placeholder="Bahan Produk"
              value={product.bahan_produk}
              onChange={ handleInputChange}
            />
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="kategori">Kategori Produk :</label>
            <Select
              options={categoryOptions}
              onChange={(selected) => handleInputChange({
                target: { name: "kategori", value: selected ? selected.value : "" }
              })}
              value={categoryOptions.find(option => option.value === product.kategori)} // Sesuaikan dengan ID kategori
              placeholder="Pilih Kategori"
              className="custom-select"
            />
          </div>
        </div>

        <div className="form-addproduct">
          {/* Notification area */}
          {notification && (
            <div
              style={{
                marginBottom: "10px",
                padding: "10px",
                background: "#d4edda",
                color: "#155724",
                borderRadius: "5px",
              }}
            >
              {notification}
            </div>
          )}

      <div className="addproduct-input row">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label htmlFor="" className="d-block">
                  Foto Produk:
              </label>
              <label
                  htmlFor="file-input"
                  style={{
                      cursor: "pointer",
                      background: "rgb(150, 138, 80)",
                      padding: "0.5rem",
                      color: "white",
                      borderRadius: "10px",
                  }}
              >
                  Pilih File
                  <input
                      id="file-input"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                  />
              </label>
              <p>Total foto dipilih: {selectedFiles.length}</p>
          </div>

          <div className="file-preview-container" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {selectedFiles.map((file, index) => (
                  <div key={index} style={{ position: "relative", width: "150px" }}>
                      <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          style={{
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              background: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                          }}
                      >
                          X
                      </button>
                      {file.type.startsWith("image") ? (
                          <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              style={{
                                  width: "100%",
                                  height: "auto",
                                  borderRadius: "10px",
                              }}
                          />
                      ) : (
                          <p>{file.name}</p>
                      )}
                  </div>
              ))}
          </div>
      </div>


        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="redirect">Redirect Produk :</label>
            <input
              type="text"
              name="redirect"
              placeholder="Redirect Produk"
              value={product.redirect}
              onChange={ handleInputChange }
            />
          </div>
        </div>

        <div className="btn-submit">
          <button
            type="submit"
            className="addproduct-save d-flex justify-content-center align-items-center"
          >
            <i className="fa-regular fa-floppy-disk me-2"></i>
            <span className="d-none d-md-block">Save Changes</span>
          </button>
        </div>
      </form>
      <Link to="/admin/productadmin">
        <button className="addproduct-back">Kembali</button>
      </Link>
    </div>
  );
};

export default EditProducts;
