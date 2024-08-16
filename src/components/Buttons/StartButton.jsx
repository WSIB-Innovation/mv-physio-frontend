import React from "react";

const StartButton = ({ onClick }) => {
  return (
    <div className="button">
      <a href="#" className="button button-1" onClick={onClick}>
        <svg>
          <rect x="0" y="0" width="100%" height="100%" rx="8" ry="8" />
        </svg>
        Register
      </a>
    </div>
  );
};

export default StartButton;
