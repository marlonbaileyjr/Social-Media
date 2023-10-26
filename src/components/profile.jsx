import React, { useContext, useEffect, useState } from 'react';
import '../css/profile.css';
import { useParams } from 'react-router-dom';
import FirstAndLastNameModal from '../props/FirstandLastNameModal';
import BioAndUsernameModal from '../props/UsernameAndBioModal';
import noImg from '../img/NOIMG.jpeg'
import { UserContext } from '../userContext';
import {getPostById, getPicturesFromPost, getPostByPostId} from '../functions/postFunctions'; 
import {getUserById} from '../functions/userFunctions';
import { getFollowed, getFollowers, addFriendship, deleteFriendship } from '../functions/friendshipFunctions'
import Post from '../props/post';

function ProfilePage(props) {
  const { userID: contextUserId } = useContext(UserContext);
  const { USER_ID: paramUserId } = useParams();

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followedCount, setFollowedCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  function handleBioIconClick() {
    setIsBioModalOpen(true);
}

function handleNameIconClick() {
    setIsNameModalOpen(true);
}

function closeBioModal() {
    setIsBioModalOpen(false);
}

function closeNameModal() {
    setIsNameModalOpen(false);
}


  const canEdit = Number(paramUserId) === contextUserId;

  useEffect(() => {
    const userData = getUserById(Number(paramUserId));
    setUser(userData);

    const userPostsData = getPostById(Number(paramUserId));  
    if (userPostsData) {
      setUserPosts(getPicturesFromPost(userPostsData.post.postId));
    }

    // Fetch followers count
    const fetchFollowers = async () => {
      const followers = await getFollowers(Number(paramUserId));
      setFollowersCount(followers.length);
    };

    // Fetch followed count
    const fetchFollowed = async () => {
      const followed = await getFollowed(Number(paramUserId));
      setFollowedCount(followed.length);
    };
    const checkFollowingStatus = async () => {
      const followers = await getFollowers(Number(paramUserId));
      const isUserFollowing = followers.some(follower => follower.userId === contextUserId);
      setIsFollowing(isUserFollowing);
    };
    
    checkFollowingStatus();
    fetchFollowers();
    fetchFollowed();

  }, [paramUserId, contextUserId]);

  const handleFollow = async () => {
    await addFriendship(contextUserId, Number(paramUserId));
    setIsFollowing(true);
    // Optionally: Update followers count after following
    const updatedFollowers = await getFollowers(Number(paramUserId));
    setFollowersCount(updatedFollowers.length);
  };

  const handleUnfollow = async () => {
    await deleteFriendship(contextUserId, Number(paramUserId));
    setIsFollowing(false);
    // Optionally: Update followers count after unfollowing
    const updatedFollowers = await getFollowers(Number(paramUserId));
    setFollowersCount(updatedFollowers.length);
  };

  function handlePostClick(post) {
    setSelectedPost(post);
    setIsModalOpen(true);
}


  function closeModal() {
    setIsModalOpen(false);
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={user.profilePicture} alt={`${user.username}'s profile`} className="profile-pic" />
        <h1>
          {user.userName}
        </h1>
        <p>
            {user.bio} {canEdit && <i className="fas fa-edit" onClick={handleBioIconClick}></i>}
        </p>
        <h2>
            {user.firstName} {user.lastName} {canEdit && <i className="fas fa-edit" onClick={handleNameIconClick}></i>}
        </h2>
        {user && ( // Ensure user data is available before rendering modals
                <>
                    {isBioModalOpen && (
                        <BioAndUsernameModal 
                            isOpen={isBioModalOpen}
                            onClose={closeBioModal}
                            initialBio={user.bio}
                            initialUsername={user.userName}
                        />
                    )}

                    {isNameModalOpen && (
                        <FirstAndLastNameModal 
                            isOpen={isNameModalOpen}
                            onClose={closeNameModal}
                            initialFirstName={user.firstName}
                            initialLastName={user.lastName}
                        />
                    )}
                </>
            )}
        
        <div className="follow-info">
        <span>
          <strong>{followersCount}</strong> followers
        </span>
        <span>
          <strong>{followedCount}</strong> following
        </span>
        {contextUserId !== Number(paramUserId) && (
          isFollowing
            ? <button onClick={handleUnfollow}>Unfollow</button>
            : <button onClick={handleFollow}>Follow</button>
        )}
      </div>
    </div>
    <div className="user-posts">
        {userPosts.map((post) => (
          <img 
            key={post.pictureId} 
            src={post.media || noImg} 
            alt="User post" 
            className="post-image" 
            onClick={() => handlePostClick(post)}
            />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <PostModal 
            post={selectedPost} 
            onClose={closeModal}
          />

        </div>
      )}
    </div>
  );
}

function PostModal({ post, onClose }) {
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const postData = await getPostByPostId(post.postId);
      setPostDetails(postData);
    };
    
    fetchPostDetails();
  }, [post.postId]);

  console.log('postsSS',postDetails)

  if (!postDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal">
      <button className="close-button" onClick={onClose}>&times;</button>
      <Post postId={post.postId} caption={postDetails.post.caption} userId={postDetails.post.userId}/>
    </div>
  );
}



export default ProfilePage;