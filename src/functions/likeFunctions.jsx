export const likes = [
    {
      "likeId": 1,
      "userId": 1,
      "postId": 3,
      "uploadTime": "2023-09-29T12:00:00Z"
    },
    {
      "likeId": 2,
      "userId": 2,
      "postId": 4,
      "uploadTime": "2023-09-29T12:10:00Z"
    },
    {
      "likeId": 3,
      "userId": 3,
      "postId": 5,
      "uploadTime": "2023-09-29T12:20:00Z"
    },
    {
      "likeId": 4,
      "userId": 4,
      "postId": 1,
      "uploadTime": "2023-09-29T12:30:00Z"
    },
    {
      "likeId": 5,
      "userId": 5,
      "postId": 2,
      "uploadTime": "2023-09-29T12:40:00Z"
    }
  ];
  
  function getLikes(postId) {
    return likes.filter(like => like.postId === postId);
  }
  
  function addLike(userId, postId) {
    const existingLike = likes.find(like => like.userId === userId && like.postId === postId);
    if (existingLike) {
      return false; // Like already exists
    }
  
    const newLike = {
      likeId: likes.length + 1, // Generate a new unique likeId
      userId,
      postId,
      uploadTime: new Date().toISOString(), // Set the current date as the uploadTime
    };
    likes.push(newLike);
    return true; // Like added successfully
  }
  
  function deleteLike(likeId) {
    const index = likes.findIndex(like => like.likeId === likeId);
    if (index !== -1) {
      likes.splice(index, 1);
      return true; // Like deleted successfully
    }
    return false; // Like not found
  }
  
  export { getLikes, addLike, deleteLike };
  