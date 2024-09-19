import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ProductTable from "./../BundlingAdmin/PilihProduk";

const PilihProdukModal = ({
  allProducts,
  handleProdukChange,
  produk,
  setProduk,
}) => {
  const [show, setShow] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]); // State untuk menyimpan produk yang dipilih

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Menyimpan produk yang dipilih setelah modal ditutup
  const handleSaveSelection = () => {
    const selected = allProducts.filter((product) =>
      produk.includes(String(product.id))
    );
    setSelectedProducts(selected);
    handleClose();
  };

  return (
    <>
      <a href="#" className="modal-produk" onClick={handleShow}>
        <i className="fa-solid fa-arrow-up me-3"></i>Pilih Produk
      </a>

      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Pilih Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductTable
            allProducts={allProducts}
            handleProdukChange={handleProdukChange}
            produk={produk}
            setProduk={setProduk}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#968a50",
              border: "none",
              width: "100%",
            }}
            onClick={handleSaveSelection} // Memanggil handleSaveSelection
          >
            Pilih
          </Button>
        </Modal.Footer>
      </Modal>

      {/* List produk yang dipilih ditampilkan di bawah modal */}
      <div className="selected-products mt-5 ms-3" style={{backgroundColor: "rgb(150, 138, 80)", color: "white", padding: "1rem", width: "50%", borderRadius: "10px"   }}>
        <h5>Produk yang dipilih:</h5>
        {selectedProducts.length > 0 ? (
          <ul>
            {selectedProducts.map((product) => (
              <li key={product.id}>
                <img
                  src={`http://127.0.0.1:8000/storage/images/${product.foto_produk}`}
                  alt={product.nama_produk}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                - {product.nama_produk}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada produk yang dipilih.</p>
        )}
      </div>
    </>
  );
};

export default PilihProdukModal;
