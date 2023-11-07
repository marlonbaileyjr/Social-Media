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
import { useFriends } from '../hooks/friendshipHooks';
import Post from '../props/post';

function ProfilePage() {

  const { userID: contextUserId, setParam } = Users();
  console.log('context', contextUserId)
  const { USER_ID: paramUserId } = useParams();
  console.log('param', paramUserId)
  setParam(paramUserId)

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

  const {followers, following, addFriendship, deleteFriendship, checkFriendship} = useFriends()


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

  const canEdit = Number(paramUserId) === Number(contextUserId);

  useEffect(() => {
    fetchUserDetails();
  
    const fetchUser = async () => {
      try {
        const userData = await getUserById(Number(paramUserId));
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUser();
  
    const fetchUserPosts = async () => {
      try {
        const userPostsData = await retrievePostByUserId(Number(paramUserId));
        console.log('Profile page posts:', userPostsData);
  
        if (userPostsData && userPostsData.length > 0) {
          const postsWithMedia = await Promise.all(
            userPostsData.map(async (post) => {
              const res = await getPostMedia(post.postId);
              return {
                ...post,
                media: res.media
              };
            })
          );
  
          setUserPosts(postsWithMedia);
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setUserPosts([]);
      }
    };
  
    fetchUserPosts();
    
  }, [paramUserId, contextUserId, fetchUserDetails]);

  useEffect(()=>{
    const fetchFollowers = () => {
      const count = followers.length;
      setFollowersCount(count );
    };
  
    const fetchFollowed = () => {
      const count = following.length;
      setFollowedCount(count );
    };
  
    fetchFollowers();
    fetchFollowed();
  }, [paramUserId, following, followers])
  
  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (contextUserId !== Number(paramUserId)) {
        try {
          const response = await checkFriendship({
            followerId: contextUserId,
            followedId: Number(paramUserId)
          });
          setIsFollowing(response);
        } catch (error) {
          console.error('Error checking following status:', error);
        }
      }
    };
  
    checkFollowingStatus();
  
  }, [checkFriendship, contextUserId, paramUserId,]);
  

  const handleFollow = async () => {
    addFriendship({followerId:contextUserId, followedId:Number(paramUserId)})
  };
  
  const handleUnfollow = async () => {
    deleteFriendship({followerId:contextUserId ,followedId: paramUserId})
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
        {Number(contextUserId) !== Number(paramUserId) && (
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