import { useState } from "react";
import { IoLibraryOutline } from "react-icons/io5";
import { BsChatSquareText } from "react-icons/bs";
import AboutModal from "./GamesPage/AboutModal";
import StatisticsModal from "./GamesPage/StatisticsModal";
import logo from "../images/logo.png";
import RulesModal from "./GamesPage/RulesModal";
import { BsMortarboard } from "react-icons/bs";

const Menu = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showRules, setShowRules] = useState(false);


  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  const handleCloseStatistics = () => {
    setShowStatistics(false);
  };

  const handleCloseRules = () => {
    setShowRules(false);
  };

  
  const handleShowAbout = () => { setShowAbout(true); };
  const handleShowStatistics = () => setShowStatistics(true);
  const handleShowRules = () => setShowRules(true);

  return (
    <div className="container-navbar flex">
      <div className="flex left">
        <div className="logo">
          <a href="/games/">
            <img src={logo} className="image_logo" alt="import"></img>
          </a>
        </div>
        <div className="brand">BatlWord</div>
      </div>
      <div className="flex right">
        <div onClick={handleShowAbout} className="b">
          <BsChatSquareText />
        </div>
        <div onClick={handleShowStatistics} className="b">
          <BsMortarboard />
        </div>
        <div onClick={handleShowRules} className="b">
          <IoLibraryOutline />
        </div>
      </div>

      <AboutModal show={showAbout} handleClose={handleCloseAbout} />
      <StatisticsModal
        show={showStatistics}
        handleClose={handleCloseStatistics}
      />
      <RulesModal show={showRules} handleClose={handleCloseRules} />
    </div>
  );
};

export default Menu;