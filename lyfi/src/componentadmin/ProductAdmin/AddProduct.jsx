import React from "react";
import { Link } from "react-router-dom";

const AddProduct = ({
  nama_produk, harga_produk, detail_produk, bahan_produk, cara_pemakaian, 
  redirect, kategori, allCategories, handleInputChange, handleCheckboxChange, 
  handleFileChange, handleSubmit
}) => {
  return (
    <div className="addproduct text-start mt-5">
      <form onSubmit={handleSubmit}>
        <div className="header-addproduct">
          <h1>Buat Produk</h1>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="nama_produk">Nama Product :</label>
            <input
              type="text"
              name="nama_produk"
              placeholder="Your Answer"
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
              placeholder="Your Answer"
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
              placeholder="Your Answer"
              value={detail_produk}
              onChange={(e) => handleInputChange.setDetailProduk(e.target.value)}
            />
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="cara_pemakaian">Cara Pemakaian Produk :</label>
            <input
              type="text"
              name="cara_pemakaian"
              placeholder="Your Answer"
              value={cara_pemakaian}
              onChange={(e) => handleInputChange.setCaraPemakaian(e.target.value)}
            />
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="bahan_produk">Bahan Produk :</label>
            <input
              type="text"
              name="bahan_produk"
              placeholder="Your Answer"
              value={bahan_produk}
              onChange={(e) => handleInputChange.setBahanProduk(e.target.value)}
            />
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="kategori">Kategori Produk :</label>
            <div className="checkbox-container">
              {allCategories.map((category) => (
                <div className="checkbox-group" key={category.id}>
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    name="kategori"
                    value={category.id}
                    checked={kategori.includes(String(category.id))}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`category-${category.id}`}>
                    {category.nama_kategori}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="foto_produk">Foto Produk :</label>
            <label htmlFor="file" className="file">
              <i className="bi bi-cloud-upload"></i> Upload
            </label>
            <input
              type="file"
              id="file"
              name="foto_produk"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="redirect">Redirect Produk :</label>
            <input
              type="text"
              name="redirect"
              placeholder="Your Answer"
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
        <button className="addproduct-back">
          Kembali
        </button>
      </Link>
    </div>
  );
};

export default AddProduct;
