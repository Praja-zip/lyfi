import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ProductTable from "./../BundlingAdmin/PilihProduk";
import produk from "./../../assets/LandingPage/about.png";
const PilihProdukModal = ({ allProducts, 
  handleProdukChange, produk, setProduk }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log('ini darimodal',allProducts);

  return (
    <>
      <a href="#" className="modal-produk" onClick={handleShow}>
        <i class="fa-solid fa-arrow-up me-3"></i>Pilih Produk
      </a>

      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Pilih Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductTable allProducts={allProducts}
          handleProdukChange={handleProdukChange}
          produk={produk}
          setProduk={setProduk}/>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#968a50",
              border: "none",
              width: "100%",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PilihProdukModal;
