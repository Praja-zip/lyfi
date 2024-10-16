import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const AddProduct = ({
  nama_produk,
  harga_produk,
  detail_produk,
  bahan_produk,
  cara_pemakaian,
  redirect,
  kategori,
  allCategories,
  handleInputChange,
  handleSubmit,
  selectedFiles,
  setSelectedFiles,
  setSelectedCategory,
  handleFileChange,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(""); // State for notifications
  const maxFiles = 4; // Maksimal file yang bisa diupload

  // Map categories to the format expected by react-select
  const categoryOptions = allCategories.map((category) => ({
    value: category.id,
    label: category.nama_kategori,
  }));

  // Handle when a category is selected
  const handleDropdownChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  // Handle file removal
  const handleRemoveFile = (index, e) => {
    e.preventDefault(); // Prevent form submit when removing file

    const fileName = selectedFiles[index].name; // Get the file name before removing
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    // Set notification when a file is removed
    setNotification(`Foto ${fileName} berhasil dihapus`);
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

  // Handle file addition with limit of 4 files
  const handleFileChangeWithLimit = (e) => {
    const files = Array.from(e.target.files);
    if (selectedFiles.length + files.length > maxFiles) {
      setNotification(`Maksimal hanya bisa menambahkan ${maxFiles} foto.`);
      return; // Prevent adding files if it exceeds the limit
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleCloseError = () => {
    setShowNotification(false); // Hide the error popup when close button is clicked
  };

  return (
    <div className="addproduct text-start mt-5">
      <form onSubmit={handleSubmit}>
        <div className="header-addproduct">
          <h1>Buat Produk</h1>
        </div>

        {/* Notifikasi */}
        {showNotification && (
          <div className="notification-popup d-flex">
            <p className="alert alert-danger">{message}</p>
            <button className="close-btn ms-4" onClick={handleCloseError}>
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
              value={nama_produk}
              onChange={(e) => handleInputChange.setNamaProduk(e.target.value)}
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
              value={harga_produk}
              onChange={(e) => handleInputChange.setHargaProduk(e.target.value)}
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
              value={detail_produk}
              onChange={(e) =>
                handleInputChange.setDetailProduk(e.target.value)
              }
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
              value={cara_pemakaian}
              onChange={(e) =>
                handleInputChange.setCaraPemakaian(e.target.value)
              }
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
              value={bahan_produk}
              onChange={(e) => handleInputChange.setBahanProduk(e.target.value)}
            />
          </div>
        </div>
        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="kategori">Kategori Produk :</label>
            <Select
              options={categoryOptions}
              onChange={handleDropdownChange}
              placeholder="Select value"
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
                background: "#ffcaca",
                border : "1px solid #e65e5e",
                color: "#155724",
                borderRadius: "5px",
              }}
            >
              {notification}
            </div>
          )}

          <div className="addproduct-input row">
            {/* File input and total file count */}
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
                  onChange={handleFileChangeWithLimit} // Use the new file change handler
                  style={{ display: "none" }}
                />
              </label>
              <p>Total foto dipilih: {selectedFiles.length}</p>
            </div>

            {/* File preview section */}
            <div
              className="file-preview-container"
              style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
            >
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  style={{ position: "relative", width: "150px" }}
                >
                  <button
                    type="button" // Ensure this is a button, not submit
                    onClick={(e) => handleRemoveFile(index, e)}
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
              value={redirect}
              onChange={(e) => handleInputChange.setRedirect(e.target.value)}
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

export default AddProduct;
