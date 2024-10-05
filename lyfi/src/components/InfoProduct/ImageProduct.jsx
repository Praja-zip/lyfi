import React, { useState, useEffect } from "react";

const ImageProduct = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    // Set default image to the first one if available
    if (product.foto_produk && product.foto_produk.length > 0) {
      setSelectedImage(`http://127.0.0.1:8000/${product.foto_produk[0]}`);
    }
  }, [product]);

  // Function to handle image click
  const handleImageClick = (image) => {
    setSelectedImage(`http://127.0.0.1:8000/${image}`);
  };

  return (
    <div className="container text-center">
      <div className="row justify-content-start align-items-center flex-column flex-md-row">
        <div className="col-12 col-md-4 image-small d-flex flex-row flex-md-column align-items-center align-items-md-end mb-3 mb-md-0">
          {product.foto_produk.map((image, index) => (
            <img
              key={index}
              src={`http://127.0.0.1:8000/${image}`}
              className=" image-small-detail"
              alt={`Small ${index + 1}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <div className="col-12 col-md-8 image-big">
          {selectedImage ? (
            <img src={selectedImage} className="w-100" alt="Big" />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageProduct;
