import React from 'react';

function DeleteBundling({ onConfirm, onCancel, bundlingName }) {
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <h4>Hapus Bundling</h4>
        <p>Apakah Anda yakin ingin menghapus bundling <strong>{bundlingName}</strong>?</p>
        <div className="delete-modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}>Hapus</button>
          <button className="btn btn-secondary" onClick={onCancel}>Batal</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBundling;
