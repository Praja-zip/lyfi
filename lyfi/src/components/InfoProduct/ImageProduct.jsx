import React, { useState } from "react";
import Product from "../../assets/LandingPage/produk.png";

const ImageProduct = () => {
  const [selectedImage, setSelectedImage] = useState(Product); // State to track the selected image

  // Function to handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="container text-center">
      <div className="row justify-content-start align-items-center flex-column flex-md-row">
        <div className="col-12 col-md-4 image-small d-flex flex-row flex-md-column align-items-center align-items-md-end mb-3 mb-md-0">
          <img
            src={Product}
            className="w-25 w-md-50 mb-2 image-small-detail"
            alt="Small 1"
            onClick={() => handleImageClick(Product)}
          />
          <img
            src={Product}
            className="w-25 w-md-50 mb-2 image-small-detail"
            alt="Small 2"
            onClick={() => handleImageClick(Product)}
          />
          <img
            src={Product}
            className="w-25 w-md-50 mb-2 image-small-detail"
            alt="Small 3"
            onClick={() => handleImageClick(Product)}
          />
          <img
            src={Product}
            className="w-25 w-md-50 mb-2 image-small-detail"
            alt="Small 4"
            onClick={() => handleImageClick(Product)}
          />
        </div>
        <div className="col-12 col-md-8 image-big">
          <img src={selectedImage} className="w-100" alt="Big" />
        </div>
      </div>
    </div>
  );
};

export default ImageProduct;
