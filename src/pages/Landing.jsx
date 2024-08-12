import React from "react";
import { useNavigate } from "react-router-dom";
import homepage from "../assets/homepage.png";
import Tag from "../components/Tag";
import StartButton from "../components/Buttons/StartButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";

const Landing = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/register");
  }

  const handleContinueAsGuest = () => {
    navigate("/main");
  };

  return (
    <div className="landing-page">
      <div className="top-part">
        <Tag />
        <div className="text">
          <div className="title">Machine Vision</div>
          <div className="sub-title">
            Improve and heal with real-time tracking and analysis of exercise movement.
          </div>
        </div>
        <div className="landing-bottom-container">
          <div className="button-container">
            <SecondaryButton text="Log in" onClick={handleSignInClick} />
            <StartButton onClick={handleSignupClick} />
          </div>
          <p>- or -</p>
          <h3 
            onClick={handleContinueAsGuest} 
            style={{ cursor: 'pointer', color: '#25487c', textDecoration: 'underline' }}
          >
            Continue as a guest
          </h3>
        </div>
      </div>

      <img src={homepage} alt="Homepage" />
    </div>
  );
};

export default Landing;
