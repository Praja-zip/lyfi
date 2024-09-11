import React from "react";
import PilihProdukModal from "./PilihprodukModal";
import { Link } from "react-router-dom";

const AddBundling = ({
  produk,
  handleSubmit,
  setProduk,
  namaBundle,
  hargaBundle,
  detailBundle,
  allProducts,
  handleFotoChange,
  fotoPreview,
  handleProdukChange,
  setNamaBundle,
  setDetailBundle,
  setHargaBundle,
  setTokopediaLink,
  setShopeeLink,
}) => {
  return (
    <>
      <div className="addproduct text-start mt-5">
        <div className="header-addproduct">
          <h1>Buat Bundling</h1>
        </div>
        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="addproduct">Nama Bundling :</label>
            <input
              type="text"
              placeholder="Your Answer"
              value={namaBundle}
              onChange={(e) => setNamaBundle(e.target.value)}
            />
          </div>
        </div>
        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="addproduct">Harga Bundling :</label>
            <input
              type="text"
              placeholder="Your Answer"
              value={hargaBundle}
              onChange={(e) => setHargaBundle(e.target.value)}
            />
          </div>
        </div>
        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="addproduct">Detail Bundling :</label>
            <input
              type="text"
              placeholder="Your Answer"
              value={detailBundle}
              onChange={(e) => setDetailBundle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="addproduct">Pilih Produk :</label>
            <PilihProdukModal
              allProducts={allProducts}
              handleProdukChange={handleProdukChange}
              produk={produk}
              setProduk={setProduk}
            />
          </div>
        </div>
        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="addproduct">Link Bundling :</label>
            <div className="link-product">
            <input
                type="text"
                placeholder="Tokopedia"
                onChange={(e) => setTokopediaLink(e.target.value)}
              />
              <input
                type="text"
                placeholder="Shopee"
                onChange={(e) => setShopeeLink(e.target.value)} // Input untuk Shopee
              />

            </div>
          </div>
        </div>
        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="addproduct">Foto Bundling :</label>
            <label htmlFor="file" className="custum-file-upload mt-4 ms-4">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="text">
                <span>Click to upload image</span>
              </div>
              <input id="file" type="file" onChange={handleFotoChange} />
            </label>
            {/* foto priview */}
            {fotoPreview && (
              <div className="image-preview mt-4">
                <img src={fotoPreview} alt="Foto Preview" width="200" />
              </div>
            )}
          </div>
        </div>
        <button onClick={handleSubmit} className="addproduct-save d-flex justify-content-center align-items-center">
          <i className="fa-regular fa-floppy-disk me-2"></i>{" "}
          <span className="d-none d-md-block">Save Changes</span>
        </button>
        <Link to="/admin/productadmin">
          <button className="addproduct-back d-flex justify-content-center align-items-center">
            <i className="fa-regular fa-circle-left me-2"></i>{" "}
            <span className="d-none d-md-block">Kembali</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default AddBundling;
