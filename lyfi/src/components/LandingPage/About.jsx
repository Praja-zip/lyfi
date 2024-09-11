import React from "react";
import about from "./../../assets/LandingPage/about.png";
import "./LandingPage.css";

const About = () => {
  return (
    <>
      <div class="container-about text-center">
        <div class="row">
          <div class="col">
            <img src={about} alt="" />
          </div>
          <div class="col text">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              ornare, est a efficitur lacinia, enim libero venenatis dolor, a
              eleifend dui nibh eu lorem. Quisque ligula leo, commodo vel
              volutpat ac, aliquam quis elit. Donec felis lorem, sagittis eget
              leo a, efficitur facilisis ipsum. Nunc eget tempus ipsum.
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
