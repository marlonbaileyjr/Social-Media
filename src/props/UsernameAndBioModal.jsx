import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/updateProfile.css';

Modal.setAppElement('#root'); // this line should be in your root component instead

function BioAndUsernameModal({ isOpen, onClose, initialBio = '', initialUsername = '' }) {
  const [bio, setBio] = useState(initialBio);
  const [username, setUsername] = useState(initialUsername);

  const updateProfile = () => {
      console.log("Updated profile:", bio, username);
      // You might want to do something (e.g., API call) before closing
      onClose(); // call the passed onClose method
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} // calling the external close handler
      style={customStyles}
    >
      <h2>Update Profile</h2>
      <div>
          <label>Username: </label>
          <input
              value={username}
              onChange={e => setUsername(e.target.value)}
          />
      </div>
      <div>
          <label>Bio: </label>
          <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
          />
      </div>
      <button onClick={updateProfile}>Update</button>
      <button onClick={onClose}>Close</button> {/* calling the external close handler */}
    </Modal>
  );
}

export default BioAndUsernameModal;
