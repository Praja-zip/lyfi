import React from "react";

const DeleteProducts = ({ onConfirm, onCancel, productName }) => {
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <h4>Hapus Produk</h4>
        <p>Apakah Anda yakin ingin menghapus produk <strong>{productName}</strong>?</p>
        <div className="delete-modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}>
            Hapus
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProducts;
