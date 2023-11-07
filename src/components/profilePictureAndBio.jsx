import React, { useState } from 'react';
import { updateProfilePicture, updateBio } from '../functions/userFunctions';
import { useParams, useNavigate } from 'react-router-dom';
import { Users } from '../hooks/userHooks';



const ProfilePictureAndBio = () => {
    const navigate = useNavigate();
    const { userId } = useParams()
    const {setUserID, setLoggedin} = Users()
    setUserID(userId)
    const [profilePicture, setProfilePicture] = useState(null);
    const [bio, setBio] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

  const login=()=>{
    setLoggedin(true)
  navigate(`/`);

  }

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
        await updateBio(Number(userId), bio);
      }
      alert('Profile updated successfully!');
      login()
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
            accept="image/jpeg, image/png, image/gif"
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
      <button onClick={() =>login()} disabled={isSubmitting}>
        Skip
      </button>
    </div>
  );
};

export default ProfilePictureAndBio;