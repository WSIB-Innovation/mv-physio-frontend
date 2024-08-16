import React from "react";

const PrimaryButton = ({ text, onClick }) => {
  return (
    <div>
      <a href="#" className="btn" onClick={onClick}>
        {text}
      </a>
    </div>
  );
};

export default PrimaryButton;
