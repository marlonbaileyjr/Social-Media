import React, { useContext } from 'react';
import '../css/profile.css'
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext'; // Adjust the path
import { postsWithPictures } from '../data';
import profileimg from '../img/catProfilePicture.jpeg'

function ProfilePage(props) {
  const { userID: contextUserId } = useContext(UserContext);
  const { USER_ID: paramUserId } = useParams();
  console.log('context', contextUserId)
  console.log('param',paramUserId)

  const canEdit = Number(paramUserId) === contextUserId;
    
    const {
        profileImage = profileimg,
        followersCount = 100,
        followingCount = 150,
        username = "sampleUsername",
        firstName = "Jane",
        lastName = "Doe",
        bio = "This is a sample bio.",
    } = props;

    return (
        
        <div className="profile-page">
            <div className="profile-header">
                <img src={profileImage} alt={`${username}'s profile`} className="profile-pic" />
                {canEdit && <i className="fas fa-edit"></i>}
                <h1>{username} {canEdit && <i className="fas fa-edit"></i>}</h1>
                <h2>{firstName}{lastName} {canEdit && <i className="fas fa-edit"></i>}</h2>
                <p>{bio} {canEdit && <i className="fas fa-edit"></i>}</p>
                <div className="follow-info">
                    <span><strong>{followersCount}</strong> followers</span>
                    <span><strong>{followingCount}</strong> following</span>
                </div>
            </div>
            <div className="user-posts">
                {postsWithPictures.map((post) => (
                    <img key={post.postId} src={post.picture.media} alt="User post" className="post-image" />
                ))}
            </div>
        </div>
    );
}

export default ProfilePage;
