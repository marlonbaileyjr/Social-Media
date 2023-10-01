import React, { useContext, useEffect, useState } from 'react';
import '../css/profile.css';
import { useParams } from 'react-router-dom';
import noImg from '../img/NOIMG.jpeg'
import { UserContext } from '../userContext';
import getPostById from '../functions/getUserPost'; // Import the getPostById function
import getUserById from '../functions/getUser';

function ProfilePage(props) {
  const { userID: contextUserId } = useContext(UserContext);
  const { USER_ID: paramUserId } = useParams();

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // State to store user's posts

  const canEdit = Number(paramUserId) === contextUserId;

  useEffect(() => {
    // Fetch user data when the component mounts
    const userData = getUserById(Number(paramUserId));
    if (userData) {
      setUser(userData);
  
      // Fetch user's posts by userId using getPostById function
      const userPostsData = getPostById(Number(paramUserId));  
      if (userPostsData && userPostsData.pictures && userPostsData.pictures.length > 0) {
        const firstImage = userPostsData.pictures.find(
          (picture) => picture.type === 'image'
        );
          if (firstImage) {
            console.log('fimg', firstImage)
          setUserPosts([firstImage]);
        } else {
          const NoImage={pictureId:null, postId: userPostsData.postId, type: 'image', order: 1, media: noImg}
          setUserPosts([NoImage]);
        }
      } else {
        const NoImage={pictureId:null, postId: userPostsData.postId, type: 'image', order: 1, media: noImg}
        setUserPosts([NoImage]);      }
    }
  }, [paramUserId, contextUserId]);
  
  
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={user.profilePicture} alt={`${user.username}'s profile`} className="profile-pic" />
        {canEdit && <i className="fas fa-edit"></i>}
        <h1>
          {user.userName} {canEdit && <i className="fas fa-edit"></i>}
        </h1>
        <h2>
          {user.firstName} {user.lastName} {canEdit && <i className="fas fa-edit"></i>}
        </h2>
        <p>
          {user.bio} {canEdit && <i className="fas fa-edit"></i>}
        </p>
        <div className="follow-info">
          <span>
            <strong>{100}</strong> followers
          </span>
          <span>
            <strong>{100}</strong> following
          </span>
        </div>
    </div>
      <div className="user-posts">
        {userPosts.map((post) => (
          <img key={post.pictureId} src={post.media} alt="User post" className="post-image" />
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
