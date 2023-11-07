import React, { useState } from 'react';
import Modal from 'react-modal';
import { updateProfilePicture } from '../functions/userFunctions';
import '../css/updateProfile.css';
import { Users } from '../hooks/userHooks';

function ProfilePictureModal({ isOpen, onClose, Picture }) {
    console.log("picture", Picture)
  const { userID } = Users();
  const [loading, setLoading] = useState(false);
  const [newPicture, setNewPicture] = useState(null);

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

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPicture(file);
    }
  };

  const handleSubmit = async () => {
    if (!newPicture) {
      alert('Please select a picture to upload.');
      return;
    }

    setLoading(true);
    try {
      await updateProfilePicture(userID, newPicture);
      onClose();
    } catch (error) {
      console.error('Error updating profile picture:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={!loading ? onClose : null}
      style={customStyles}
      shouldCloseOnOverlayClick={!loading} 
    >
      <div className="update-profile-modal">
        <h2>Update Profile Picture</h2>
        <img 
          src={Picture} 
          alt="Profile"
          className="current-profile-picture"
        />
        <input type="file" onChange={handlePictureChange} disabled={loading} accept="image/jpeg, image/png, image/gif"/>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Updating...' : 'Submit Picture'}
        </button>
        <button onClick={onClose} disabled={loading}>
          Close
        </button>
      </div>
    </Modal>
  );
}

export default ProfilePictureModal;
