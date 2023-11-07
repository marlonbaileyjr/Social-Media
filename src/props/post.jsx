import React, { useEffect, useState} from 'react';
import Slider from 'react-slick';
import '../css/post.css';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../functions/userFunctions';
import {Users} from '../hooks/userHooks'
import { usePosts } from '../hooks/postHooks';
import {useComments} from '../hooks/commentHooks'
import { useLikes } from '../hooks/likeHooks';


const processComments = (comments) => {
  const commentMap = new Map();

  comments.forEach((commentData) => {
    if (!commentData.replies) {
      commentData.replies = [];
    }
    commentMap.set(commentData.commentId, commentData);
  });

  const topLevelComments = comments.filter(
    (commentData) => !commentData.parentCommentId
  );

  comments.forEach((commentData) => {
    if (commentData.parentCommentId) {
      const parentId = Number(commentData.parentCommentId);
      if (commentMap.has(parentId)) {
        const parentComment = commentMap.get(parentId);
        if (!parentComment.replies.includes(commentData)) {  // Check if comment isn't already in the replies
          parentComment.replies.push(commentData);
        }
      } else {
        console.warn("Failed to find parent for comment: ", commentData);
      }
    }
  });

  return topLevelComments;
};


function Post({ postId, caption, userId, likes, comments }) {

  const navigate = useNavigate();
  const { userID } = Users();
  const {addLike, deleteLike} = useLikes()
  const [showComments, setShowComments] = useState(false);
  const [user, setUser] = useState('');
  const {usePostMediaDetails} = usePosts()
  const { data: pictures } = usePostMediaDetails(postId);
  const [liked, setLiked] = useState(false)


  const handleLikeClick = async () => {
    // If the post is already liked, unlike it.
  if (liked) {
    try {
      //deleteLike(userID, postId);
      setLiked(false);
    } catch (error) {
      console.error('Error unliking the post:', error);
    }
  }
  // If the post is not liked, like it.
  else {
    try {
      addLike({userId: userID, postId: postId});
      setLiked(true);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }
};
  

  useEffect(() => {
    const fetchUserAndSetState = async (userId) => {
      try {
        const user = await getUserById(userId);
        setUser(user);
      } catch (error) {
        console.error('An error occurred while fetching the user:', error);
        setUser('Failed to load user data');
      }
    };

    fetchUserAndSetState(userId);
  }, [userId]);


 

  const navigateToProfile = (userid) => {
    navigate(`/profile/${userid}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (

    <div className="post-container">
      <div className="profile-bar" onClick={() => navigateToProfile(user.userId)}>
        {user && user.profilePicture && (
          <img
            src={`data:image/jpeg;base64,${user.profilePicture}`}
            alt="User Profile"
            className="user-profile-picture"
          />
        )}
        {user && user.userName && (
          <p className="user-username">{user.userName}</p>
        )}
      </div>
      <div>
        {pictures && pictures.length > 1 ? (
          <Slider {...settings}>
            {pictures.map((pic, index) => (
              <div key={index}>
                <img src={`data:image/jpeg;base64,${pic}`} alt={`Slide ${index}`} />
              </div>
            ))}
          </Slider>
        ) : pictures && pictures.length === 1 ? (
          <img src={`data:image/jpeg;base64,${pictures[0]}`} alt="Post" />
        ) : null}

        <p>{caption}</p>
        <div className="interaction-layer">
        <i
          className={`fas fa-thumbs-up like-icon ${liked ? 'liked' : ''}`}
          onClick={handleLikeClick}
        ></i>
        <span>{likes}</span>
          <i
            className="fas fa-comment comment-icon"
            onClick={() => setShowComments(!showComments)}
          >
            {" "}
          </i>
        </div>

        {showComments && <CommentsDropdown comments={comments} postId={postId} />}
      </div>
    </div>
  );
        }


function CommentsDropdown({ comments, postId}) {
  const { userID } = Users();
  const {addComment} = useComments()
  const processedComments = processComments(comments);
  const [text, setText] = useState('');

  return (

    <div className="comments-dropdown">
      <div className="comments-scroll-box">
        {processedComments.map((comment) => (
          <CommentComponent key={comment.commentId} comment={comment} postId={postId} />
        ))}
      </div>
      <textarea 
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={async () => {
        addComment({
          postId,
          userId: userID,
          text,
          parentCommentId: null
      });
      }}>Add Comment</button>
    </div>

  );
}


function CommentComponent({ comment, postId }) {
  const { userID } = Users();
  const {addComment} = useComments()
  const [showReplies, setShowReplies] = useState(false);
  const [text, setText] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  return (

    <div className="comment">
      <div className="comment-content">
        <p className="reply-button" onClick={(e) => {
          setShowCommentBox(!showCommentBox);
        }}>Reply</p>

        <p className="comment-text">{comment.text}</p>

        {comment.replies && comment.replies.length > 0 && (
          <i
            className={`fas fa-chevron-${showReplies ? "up" : "down"}`}
            onClick={(e) => {
              setShowReplies(!showReplies);
            }}
          ></i>
        )}
      </div>
      
      {showReplies && comment.replies.map((reply) => (
        <CommentComponent key={reply.commentId} comment={reply} postId={postId} />
      ))}
        
      {showCommentBox && (
        <div>
          <textarea 
              placeholder="Reply to this comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button onClick={() => {
    addComment({
      postId,
      userId: userID,
      text,
      parentCommentId: comment.commentId
  });
}}>Add Reply</button>
        </div>
      )}
    </div>

  );
}



export default Post;
