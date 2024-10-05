import React from "react";

function DeleteCategory({ onConfirm, onCancel, categoryName }) {
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <h4>Hapus Kategori</h4>
        <p>Apakah Anda yakin ingin menghapus kategori <strong>{categoryName}</strong>?</p>
        <div className="delete-modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}>Hapus</button>
          <button className="btn btn-secondary" onClick={onCancel}>Batal</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategory;
