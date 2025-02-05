import React from "react";
import "./RegularButton.css";

const Button = ({ label, onClick, type = "button", className = "regular-btn" }) => (
  <button className={className} onClick={onClick} type={type}>
    {label}
  </button>
);

export default Button;
