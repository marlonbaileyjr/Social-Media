import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import '../css/post.css';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../functions/userFunctions';
import { getPicturesFromPost} from '../functions/postFunctions';
import {getComments} from '../functions/commentFunction'

class Comment {
  constructor(commentData) {
    this.commentID = commentData.commentID;
    this.text = commentData.text;
    this.parentCommentID = commentData.parentCommentID;
    this.replies = []; // Array to store nested comments
  }

  addReply(reply) {
    this.replies.push(reply);
  }
}



function Post({ postId, caption, userId }) {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [user, setUser] = useState('');
  const [pictures, setPictures] = useState([]);
  const [comments, setComments] = useState([]);

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

  useEffect(() => {
    const fetchPicturesAndComments = async () => {
      try {
        const pics = await getPicturesFromPost(postId);
        setPictures(pics);
      } catch (error) {
        console.error('An error occurred while fetching pictures:', error);
      }

      try {
        const comms = await getComments(postId);
        setComments(processComments(comms)); // Assuming processComments is synchronous
      } catch (error) {
        console.error('An error occurred while fetching comments:', error);
      }
    };

    fetchPicturesAndComments();
  }, [postId]);

 

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
                <img src={pic.media} alt={`Slide ${index}`} />
              </div>
            ))}
          </Slider>
        ) : pictures && pictures.length === 1 ? (
          <img src={pictures[0].media} alt="Post" />
        ) : null}

        <p>{caption}</p>
        <div className="interaction-layer">
          <i className="fas fa-thumbs-up like-icon"></i>
          <i
            className="fas fa-comment comment-icon"
            onClick={() => setShowComments(!showComments)}
          >
            {" "}
          </i>
        </div>

        {showComments && <CommentsDropdown comments={comments} />}
      </div>
    </div>
  );
}

function CommentsDropdown({ comments }) {
  const topLevelComments = processComments(comments);

  return (
    <div className="comments-dropdown">
      <div className="comments-scroll-box">
        {topLevelComments.map((comment) => (
          <CommentComponent key={comment.commentID} comment={comment} />
        ))}
      </div>
      <textarea placeholder="Write a comment..."></textarea>
    </div>
  );
}

const processComments = (comments) => {
  const commentMap = new Map();

  comments.forEach((commentData) => {
    const comment = new Comment(commentData);
    commentMap.set(comment.commentID, comment); // Use the correct property name here
  });

  const topLevelComments = comments.filter(
    (commentData) => !commentMap.has(commentData.parentCommentID) // And here
  );

  topLevelComments.forEach((topLevelComment) => {
    addRepliesToComment(topLevelComment, commentMap);
  });

  return topLevelComments;
};

const addRepliesToComment = (comment, commentMap) => {
  comment.replies = commentMap.get(comment.commentID)?.replies || []; // Correct property name here as well
  comment.replies.forEach((reply) => addRepliesToComment(reply, commentMap));
};


function CommentComponent({ comment }) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="comment">
      <p className="comment-text">{comment.text}</p>

      {comment.replies.length > 0 && (
        <div className="comment-replies">
          <i
            className={`fas fa-chevron-${showReplies ? "up" : "down"} toggle-icon`}
            onClick={() => setShowReplies(!showReplies)}
          ></i>
          {showReplies &&
            comment.replies.map((reply) => (
              <CommentComponent key={reply.commentID} comment={reply} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Post;
