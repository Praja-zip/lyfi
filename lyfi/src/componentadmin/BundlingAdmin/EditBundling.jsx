import React, { useState } from "react";
import PilihProdukModal from "./PilihprodukModal";
import { Link } from "react-router-dom";

const EditBundling = ({
  produk,
  handleSubmit,
  setProduk,
  namaBundle,
  hargaBundle,
  detailBundle,
  allProducts,
  handleProdukChange,
  setNamaBundle,
  setDetailBundle,
  setHargaBundle,
  setTokopediaLink,
  setShopeeLink,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fotoPreview, setFotoPreview] = useState([]);
  const [tokopediaLink, setTokopediaLinkLocal] = useState("");
  const [shopeeLink, setShopeeLinkLocal] = useState("");
  const [showNotification, setShowNotification] = useState(false); // Notifikasi

  const handleFotoChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const newPreview = files.map((file) => URL.createObjectURL(file));
    setFotoPreview((prevPreview) => [...prevPreview, ...newPreview]);
  };

  const handleRemoveFile = (index, e) => {
    e.preventDefault();
    const fileName = selectedFiles[index].name;
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFotoPreview((prevPreview) => prevPreview.filter((_, i) => i !== index));
    console.log(`Foto ${fileName} berhasil dihapus`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(); // Memanggil fungsi submit yang sudah ada

    // Tampilkan notifikasi setelah submit
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false); // Notifikasi hilang setelah beberapa detik
    }, 3000); // Durasi notifikasi 3 detik

    // Reset semua state setelah submit
    setNamaBundle("");
    setHargaBundle("");
    setDetailBundle("");
    setProduk([]); // Reset produk
    setSelectedFiles([]); // Hapus file yang sudah diupload
    setFotoPreview([]); // Reset preview foto
    setTokopediaLinkLocal("");
    setShopeeLinkLocal("");
  };

  return (
    <>
      <div className="addproduct text-start mt-5">
        {showNotification && (
          <div className="alert alert-success" role="alert">
            Bundling berhasil ditambahkan!
          </div>
        )}
        <div className="header-addproduct">
          <h1>Edit Bundling</h1>
        </div>
        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="addproduct">Edit Bundling :</label>
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
                value={tokopediaLink}
                onChange={(e) => setTokopediaLinkLocal(e.target.value)}
              />
              <input
                type="text"
                placeholder="Shopee"
                value={shopeeLink}
                onChange={(e) => setShopeeLinkLocal(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-addproduct">
          <div className="addproduct-input row">
            <label htmlFor="addproduct">Foto Bundling :</label>
            <label htmlFor="file" className="custum-file-upload mt-4 ms-4">
              <div className="icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {/* SVG Icon */}
                </svg>
              </div>
              <div className="text">
                <span>Click to upload image</span>
              </div>
              <input
                id="file"
                type="file"
                multiple
                onChange={handleFotoChange}
              />
            </label>
            {fotoPreview.length > 0 && (
              <div className="image-preview mt-4 d-flex flex-wrap">
                {fotoPreview.map((preview, index) => (
                  <div key={index} className="position-relative me-3 mb-3">
                    <img src={preview} alt="Foto Preview" width="200" />
                    <button
                      type="button"
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleFormSubmit}
          className="addproduct-save d-flex justify-content-center align-items-center"
        >
          <i className="fa-regular fa-floppy-disk me-2"></i>{" "}
          <span className="d-none d-md-block">Save Changes</span>
        </button>
        <Link to="/admin/bundlingadmin">
          <button className="addproduct-back d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-arrow-left me-2"></i>{" "}
            <span className="d-none d-md-block">Back</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default EditBundling;
