import React from "react";

const SecondaryButton = ({ text, onClick }) => {
  return (
    <div>
      <a href="#" className="Sbtn" onClick={onClick}>
        {text}
      </a>
    </div>
  );
};

export default SecondaryButton;
