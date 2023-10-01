import React, { useState } from 'react';
import Slider from 'react-slick';
import '../css/post.css';
import { useNavigate } from 'react-router-dom';

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


  

  function Post({ post, comments, pictures, user }) {
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);

    const navigateToProfile = (userid)=> {
      navigate(`/profile/${userid}`);
    }
  
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
            src={user.profilePicture}
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
  
          <p>{post.caption}</p>
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
          {topLevelComments.map(comment => (
            <CommentComponent key={comment.commentID} comment={comment} />
          ))}
        </div>
        <textarea placeholder="Write a comment..."></textarea>
      </div>
    );
  }
  

  const processComments = (comments) => {
    const commentMap = new Map();
  
    // First, create a mapping of comments by their commentId
    comments.forEach(commentData => {
      const comment = new Comment(commentData);
      commentMap.set(comment.commentId, comment);
    });
  
    // Now, identify top-level comments by checking if they have a parentCommentId that exists in the mapping
    const topLevelComments = comments.filter(commentData => !commentMap.has(commentData.parentCommentId));
  
    // For top-level comments, add replies by traversing the comment tree
    topLevelComments.forEach(topLevelComment => {
      addRepliesToComment(topLevelComment, commentMap);
    });
  
    return topLevelComments;
  };
  
  // A recursive function to add replies to a comment
  const addRepliesToComment = (comment, commentMap) => {
    comment.replies = commentMap.get(comment.commentId)?.replies || [];
    comment.replies.forEach(reply => addRepliesToComment(reply, commentMap));
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
            {showReplies && comment.replies.map(reply => (
              <CommentComponent key={reply.commentID} comment={reply} />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  


export default Post;
