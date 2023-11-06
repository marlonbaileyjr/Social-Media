import React, { useState } from 'react';
import Modal from 'react-modal';
import { Users } from '../hooks/userHooks';

import '../css/updateProfile.css';
import { updateUsernameAndBio } from '../functions/userFunctions';

function BioAndUsernameModal({ isOpen, onClose, initialBio = '', initialUsername = '' }) {
  const { userID } = Users();
  const [bio, setBio] = useState(initialBio);
  const [username, setUsername] = useState(initialUsername);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateProfile = async () => {
    setLoading(true);
    try {
      // Assuming updateUsernameAndBio is an async function
      await updateUsernameAndBio(userID, username, bio);
      onClose(); // Close the modal on success
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again later.'); // Set error message to state
    }
    setLoading(false);
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
      onRequestClose={onClose} // This should only work when not loading
      style={customStyles}
      shouldCloseOnOverlayClick={!loading} // Prevent modal close when updating
    >
      <h2>Update Profile</h2>
      {error && <div className="error-message">{error}</div>}
      <div>
        <label>Username: </label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label>Bio: </label>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          disabled={loading}
        />
      </div>
      <button onClick={updateProfile} disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </button>
      <button onClick={onClose} disabled={loading}>
        Close
      </button>
    </Modal>
  );
}

export default BioAndUsernameModal;
