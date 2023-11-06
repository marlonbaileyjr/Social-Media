import React, { useCallback, useEffect, useState } from 'react';
import profileHolder from '../img/download.jpeg'
import '../css/profile.css';
import { useParams } from 'react-router-dom';
import FirstAndLastNameModal from '../props/FirstandLastNameModal';
import BioAndUsernameModal from '../props/UsernameAndBioModal';
import ProfilePictureModal from '../props/updateProfilePictureModal';
import noImg from '../img/NOIMG.jpeg'
import { Users } from '../hooks/userHooks';
import {retrievePostByUserId, getPostMedia, getPostByPostId} from '../functions/postFunctions'; 
import {getUserById} from '../functions/userFunctions';
import { getFollowed, getFollowers, addFriendship, deleteFriendship } from '../functions/friendshipFunctions'
import Post from '../props/post';

function ProfilePage(props) {
  const { userID: contextUserId } = Users();
  const { USER_ID: paramUserId } = useParams();

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followedCount, setFollowedCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  function handleBioIconClick() {
    setIsBioModalOpen(true);
}

function handlePictureIconClick() {
  setIsPictureModalOpen(true);
}

function closePictureModal() {
  setIsPictureModalOpen(false);
}

function handleNameIconClick() {
    setIsNameModalOpen(true);
}

function closeNameModal() {
    setIsNameModalOpen(false);
}
const fetchUserDetails = useCallback(async () => {
  try {
    const userData = await getUserById(Number(paramUserId));
    setUser(userData);
    console.log(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}, [paramUserId]);

function closeModalAndRefresh() {
  setIsBioModalOpen(false);
  setIsNameModalOpen(false);
  setIsPictureModalOpen(false)
  setIsModalOpen(false);
  fetchUserDetails(); // Re-fetch user data when modal closes
}

  const canEdit = Number(paramUserId) === contextUserId;

  useEffect(() => {
    fetchUserDetails();

    const fetchUser = async () => {
      try {
        const userData = await getUserById(Number(paramUserId));
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUser();
  
    const fetchUserPosts = async () => {
      try {
          const userPostsData = await retrievePostByUserId(Number(paramUserId));
          console.log('profile page posts', userPostsData);
  
          if (userPostsData && userPostsData.length > 0) {
              const mediaPromises = userPostsData.map(async post => {
                  const res = await getPostMedia(post.postId);
                  console.log('res',res)
                  const media= res.media
                  console.log(`Media for post ${post.postId}:`, media);
                  return {
                      ...post,
                      media: media
                  };
              });
  
              const postsWithMedia = await Promise.all(mediaPromises);
              setUserPosts(postsWithMedia);
          }
      } catch (error) {
          console.error('Error fetching user posts:', error);
          setUserPosts([]);
      }
  };
  
  fetchUserPosts();
  
  
    // Fetch followers count
    const fetchFollowers = async () => {
      try {
        const followers = await getFollowers(Number(paramUserId));
        setFollowersCount(followers.length);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };
  
    // Fetch followed count
    const fetchFollowed = async () => {
      try {
        const followed = await getFollowed(Number(paramUserId));
        setFollowedCount(followed.length);
      } catch (error) {
        console.error('Error fetching followed:', error);
      }
    };
  
    const checkFollowingStatus = async () => {
      try {
        const followers = await getFollowers(Number(paramUserId));
        const isUserFollowing = followers.some(follower => follower.userId === contextUserId);
        setIsFollowing(isUserFollowing);
      } catch (error) {
        console.error('Error checking following status:', error);
      }
    };
    
    fetchFollowers();
    fetchFollowed();
    checkFollowingStatus();
  
  }, [paramUserId, contextUserId, fetchUserDetails]);
  

  const handleFollow = async () => {
    try {
      await addFriendship(contextUserId, Number(paramUserId));
      setIsFollowing(true);
      const updatedFollowers = await getFollowers(Number(paramUserId));
      setFollowersCount(updatedFollowers.length);
    } catch (error) {
      console.error('Error while following user:', error);
    }
  };
  
  const handleUnfollow = async () => {
    try {
      await deleteFriendship(contextUserId, Number(paramUserId));
      setIsFollowing(false);
      // Fetch updated followers count after unfollowing
      const updatedFollowers = await getFollowers(Number(paramUserId));
      setFollowersCount(updatedFollowers.length);
    } catch (error) {
      console.error('Error while unfollowing user:', error);
      // Handle the error appropriately, maybe show a message to the user.
    }
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
      <img src={user.profilePicture ? `data:image/jpeg;base64,${user.profilePicture}` : profileHolder} alt={`${user.userName}'s profile`} className="profile-pic" /> {canEdit && <i className="fas fa-edit" onClick={handlePictureIconClick}></i>}

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
                        onClose={closeModalAndRefresh} // Changed from closeBioModal to closeModalAndRefresh
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

                    {isPictureModalOpen && (
                        <ProfilePictureModal 
                            isOpen={isPictureModalOpen}
                            onClose={closePictureModal}
                            Picture={user.profilePicture ? `data:image/jpeg;base64,${user.profilePicture}` : profileHolder}
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
            src={post.media ? `data:image/jpeg;base64,${post.media}` : noImg} 
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
      try {
        const postData = await getPostByPostId(post.postId);
        setPostDetails(postData);
      } catch (error) {
        console.error('Error fetching post details:', error);
        // Handle the error state appropriately, maybe set post details to null or show an error message
        setPostDetails(null); // or any other error handling logic
      }
    };
    
    if (post.postId) {
      fetchPostDetails();
    }
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