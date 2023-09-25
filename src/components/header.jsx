import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import { UserContext } from '../userContext';

function Header() {
  const { userID, setLoggedin } = useContext(UserContext);

  const navigate = useNavigate();

  const navigateToUpload = () => {
    navigate('/upload');
  };

  const navigateToMain = () => {
    navigate('/');
  };

  const navigateToProfile = () => {
    navigate(`/profile/${userID}`);
};

  const logOut =()=>{
    setLoggedin(false)
  }

  return (
    <header className="sticky-header">
      <div className="logo" onClick={navigateToMain}>MyLogo</div>
      <input type="text" placeholder="Search..." className="searchbar" />
      <div className="profile-actions">
        <button className="add-post-btn" onClick={logOut}>Sign Out</button>
        <button className="add-post-btn" onClick={navigateToUpload}>Add Post</button>
        <div className="profile-icon" onClick={navigateToProfile}>👤</div>
      </div>
    </header>
  );
}

export default Header;
