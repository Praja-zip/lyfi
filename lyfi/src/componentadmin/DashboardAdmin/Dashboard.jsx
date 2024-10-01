import React, { useState, useEffect } from "react";
import shop from "./../../assets/icon/cart.png";
import kubik from "./../../assets/icon/kubik.png";
import user from "./../../assets/icon/user.png";

const Dashboard = ({ produk, bundling }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  // Function to trigger notification
  const handleNotification = (msg) => {
    setMessage(msg);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false); // Hide after 3 seconds
    }, 3000);
  };

  useEffect(() => {
    // Optionally show a welcome notification when the dashboard loads
    handleNotification("Selamat datang di Dashboard Admin");
  }, []);

  return (
    <>
      {/* Notification Popup */}
      {showNotification && (
        <div className="notification-popup">
          <p className="notification-message">{message}</p>
        </div>
      )}

      <div className="container-dashboard text-start ms-2">
        <div className="row">
          <div className="col">
            <div
              className="dashboard-card card-custom mb-3"
              style={{ maxWidth: "540px" }}
            >
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src={shop}
                    style={{ width: "70px" }}
                    className="image-card-dashboard"
                    alt="Shop"
                  />
                </div>
                <div className="col-md-8 mt-3">
                  <div className="card-body">
                    <h1 className="card-title">{ produk }</h1>
                    <p className="card-text">Total Produk</p>
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="card-link-text"
                onClick={() => handleNotification("Viewing more products")}
              >
                <div className="card-footer">selengkapnya →</div>
              </a>
            </div>
          </div>
          <div className="col">
            <div
              className="dashboard-card card-custom mb-3"
              style={{ maxWidth: "540px" }}
            >
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src={kubik}
                    style={{ width: "70px" }}
                    className="image-card-dashboard"
                    alt="Kubik"
                  />
                </div>
                <div className="col-md-8 mt-3">
                  <div className="card-body">
                    <h1 className="card-title">{ bundling }</h1>
                    <p className="card-text">Total Bundling</p>
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="card-link-text"
                onClick={() => handleNotification("Viewing bundling details")}
              >
                <div className="card-footer">selengkapnya →</div>
              </a>
            </div>
          </div>
          <div className="col">
            <div
              className="dashboard-card card-custom mb-3"
              style={{ maxWidth: "540px" }}
            >
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src={user}
                    style={{ width: "50px" }}
                    className="image-card-dashboard"
                    alt="User"
                  />
                </div>
                <div className="col-md-8 mt-3">
                  <div className="card-body">
                    <h1 className="card-title">123</h1>
                    <p className="card-text">Total Visitor</p>
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="card-link-text"
                onClick={() => handleNotification("Viewing visitor details")}
              >
                <div className="card-footer">selengkapnya →</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
