export const comments = [
    {
      commentId: 1,
      postId: 1,
      userId: 2,
      text: "Great post!",
      timestamp: "2023-01-02T12:00:00Z"
    },
    {
      commentId: 2,
      postId: 1,
      userId: 3,
      text: "Thanks for sharing.",
      timestamp: "2023-01-02T13:00:00Z"
    },
    {
      commentId: 3,
      postId: 2,
      userId: 4,
      text: "Looks wonderful!",
      timestamp: "2023-01-03T15:00:00Z"
    },
    {
      commentId: 4,
      postId: 2,
      userId: 1,
      text: "Where was this taken?",
      timestamp: "2023-01-03T16:00:00Z"
    }
  ];
  
  function getComments(postId) {
    return comments.filter(comment => comment.postId === postId);
  }
  
  function addComment(postId, userId, text) {
    const newComment = {
      commentId: comments.length + 1,
      postId,
      userId,
      text,
      timestamp: new Date().toISOString()
    };
    comments.push(newComment);
    return newComment;
  }
  
  function deleteComment(commentId) {
    const index = comments.findIndex(comment => comment.commentId === commentId);
    if (index !== -1) {
      comments.splice(index, 1);
      return true; // Comment deleted successfully
    }
    return false; // Comment not found
  }
  
  function editComment(commentId, newText) {
    const comment = comments.find(comment => comment.commentId === commentId);
    if (comment) {
      comment.text = newText;
      return true; // Comment edited successfully
    }
    return false; // Comment not found
  }
  
  export { getComments, addComment, deleteComment, editComment };
  