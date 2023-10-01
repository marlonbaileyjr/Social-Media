import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import { UserContext } from '../userContext';

function Header() {
  const { userID, setLoggedin } = useContext(UserContext);
  const navigate = useNavigate();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateToUpload = () => {
    navigate('/upload');
  };

  const navigateToMain = () => {
    navigate('/');
  };

  const navigateToProfile = () => {
    navigate(`/profile/${userID}`);
  };

  const logOut = () => {
    setLoggedin(false);
    setMenuVisible(false); // Close the menu when signing out
  };

  return (
    <header className="sticky-header">
      <div className="logo" onClick={navigateToMain}>
        MyLogo
      </div>
      <div className={`menu-icon ${menuVisible ? 'open' : ''}`} onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="searchbar-div">
        <input type="text" placeholder="Search..." className="searchbar" />
      </div>
      <div className={`profile-menu ${menuVisible ? 'visible' : ''}`}>
        <div className="menu-header">
          <span className="close-button" onClick={toggleMenu}>
            &times;
          </span>
        </div>
        <div className="menu-content">
          <div className="menu-item" onClick={navigateToProfile}>
            <i className="fas fa-user"></i> View Profile
          </div>
          <div className="menu-item" onClick={logOut}>
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </div>
          <div className="menu-item" onClick={navigateToUpload}>
            <i className="fas fa-plus"></i> Add Post
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
