import React from "react";
import loadingImage from "../assets/imgs/loader.svg";

function Spinner() {
  const containerStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  const loader = {
    width: "150px",
    height: "150px",
    opacity: 1,
    transition: "opacity 300ms ease-out",
  };
  return (
    <div style={containerStyle}>
      <img src={loadingImage} style={loader} alt="loader" />
    </div>
  );
}

export default Spinner;
