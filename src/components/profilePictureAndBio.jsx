import React, { useState } from 'react';
import { updateProfilePicture, updateBio } from '../functions/userFunctions';
import { useParams } from 'react-router-dom';

const ProfilePictureAndBio = () => {
    const { userId } = useParams()
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (profilePicture) {
        await updateProfilePicture(userId, profilePicture);
      }
      if (bio) {
        await updateBio(userId, bio);
      }
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was an error updating your profile. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Update Profile Picture and Bio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            onChange={handlePictureChange}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={handleBioChange}
            disabled={isSubmitting}
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      <button onClick={() => window.location.reload()} disabled={isSubmitting}>
        Skip
      </button>
    </div>
  );
};

export default ProfilePictureAndBio;