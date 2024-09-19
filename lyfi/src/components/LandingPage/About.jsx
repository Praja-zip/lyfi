import React from "react";
import about from "./../../assets/LandingPage/about.png";
import "./LandingPage.css";

const About = () => {
  return (
    <>
      <div className="container-about text-center">
        <div className="row">
          <div className="col">
            <img src={about} alt="" />
          </div>
          <div className="col text">
            <h1>About The Brand</h1>
            <hr
              style={{
                width: "20%",
                backgroundColor: "#B1A182",
                height: "2px",
                border: "none",
              }}
            />
            <p>
              Lyfi adalah serum essence premium yang bergerak di bidang
              kecantikan, diciptakan untuk mencerahkan kulit dan mencegah
              tanda-tanda penuaan dini. Dirancang sebagai produk bodycare yang
              unggul, Lyfi menawarkan perawatan menyeluruh yang meratakan warna
              kulit, menjaga kelembaban dan memberikan kilau alami. Dengan Lyfi,
              dapatkan kulit yang tampak lebih cerah, sehat, dan awet muda
              setiap hari.
            </p>
            <hr
              style={{
                width: "10%",
                backgroundColor: "#B1A182",
                height: "2px",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
