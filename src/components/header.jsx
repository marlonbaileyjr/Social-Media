import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import { Users } from '../hooks/userHooks';
import UserSearchModal from '../props/searchUserModal';

function Header() {
  const { userID, setLoggedin } = Users();
  const navigate = useNavigate();

  const [menuVisible, setMenuVisible] = useState(false);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

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
    setMenuVisible(false);
    navigate('/') // Close the menu when signing out
  };

  return (
    <header className="sticky-header">
      <div className="logo" onClick={navigateToMain}>
        MyLogo
      </div>

        <div className="search-icon">
          <i className="fas fa-search" onClick={openSearchModal}></i>
        </div>

      <div className={`menu-icon ${menuVisible ? 'open' : ''}`} onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </div>
      
      <UserSearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
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
