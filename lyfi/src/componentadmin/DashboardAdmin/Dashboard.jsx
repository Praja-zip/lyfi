import React from "react";
import shop from "./../../assets/icon/cart.png";
import kubik from "./../../assets/icon/kubik.png";
import user from "./../../assets/icon/user.png";

const Dashboard = () => {
  return (
    <>
      <div class="container-dashboard text-start ms-2">
        <div class="row">
          <div class="col">
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
                    <h1 className="card-title">123</h1>
                    <p className="card-text ">Total Produk</p>
                  </div>
                </div>
              </div>
              <a href="#" className="card-link-text">
                <div className="card-footer">selengkapnya →</div>
              </a>
            </div>
          </div>
          <div class="col">
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
                    alt="Shop"
                  />
                </div>
                <div className="col-md-8 mt-3">
                  <div className="card-body">
                    <h1 className="card-title">123</h1>
                    <p className="card-text">Total Bundling</p>
                  </div>
                </div>
              </div>
              <a href="#" className="card-link-text">
                <div className="card-footer">selengkapnya →</div>
              </a>
            </div>
          </div>
          <div class="col">
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
                    alt="Shop"
                  />
                </div>
                <div className="col-md-8 mt-3">
                  <div className="card-body">
                    <h1 className="card-title">123</h1>
                    <p className="card-text">Total Visitor</p>
                  </div>
                </div>
              </div>
              <a href="#" className="card-link-text">
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
