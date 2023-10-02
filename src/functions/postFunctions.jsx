import img1 from '../img/download.png'
import img2 from '../img/test.png'
import img3 from '../img/test1.jpeg'
//import img4 from '../img/w3kr4m2fi3111.png'
import post1 from '../img/pos1.jpeg'
import post2 from '../img/post2.jpeg'
// import post3 from '../img/post3.jpeg'
// import post4 from '../img/post4.jpeg'
// import post5 from '../img/post5.jpeg'

import {getFollowers, getFollowed, deleteFriendship, addFriendship} from './friendshipFunctions'

export const posts = [
    {
        "post": {
          "postId": 1,
          "caption": "John's latest adventure",
          "userId": 1,
          "uploadTime": "2023-09-29T12:00:00Z"
        }
      },
      {
        "post": {
          "postId": 2,
          "caption": "Jane's favorite book recommendations",
          "userId": 2,
          "uploadTime": "2023-09-29T12:30:00Z"
        }
    },
    {
        "post": {
          "postId": 3,
          "caption": "Alice's day out in the city",
          "userId": 3,
          "uploadTime": "2023-09-29T13:00:00Z"
        }
      },
      {
        "post": {
          "postId": 4,
          "caption": "Bob's new music playlist",
          "userId": 4,
          "uploadTime": "2023-09-29T13:30:00Z"
        },
      },
      {
        "post": {
          "postId": 5,
          "caption": "Charlie's trip to the mountains",
          "userId": 5,
          "uploadTime": "2023-09-29T14:00:00Z"
        },
      }
  ]

  export const Pictures = [
    {
      "pictureId": 1,
      "postId": 1,
      "type": "image",
      "order": 1,
      "media": img1,
      "uploadTime": "2023-09-29T00:00:00Z" 
    },
    {
      "pictureId": 2,
      "postId": 2,
      "type": "image",
      "order": 1,
      "media": img2,
      "uploadTime": "2023-09-29T00:00:00Z"
    },
    {
      "pictureId": 3,
      "postId": 2,
      "type": "video",
      "order": 2,
      "media": img3,
      "uploadTime": "2023-09-29T00:00:00Z"
    },
    {
      "pictureId": 4,
      "postId": 3,
      "type": "image",
      "order": 1,
      "media": post1,
      "uploadTime": "2023-09-29T00:00:00Z"
    },
    {
      "pictureId": 5,
      "postId": 4,
      "type": "image",
      "order": 1,
      "media": post2,
      "uploadTime": "2023-09-29T00:00:00Z"
    }
  ]

  function getPostById(userId) {
    return posts.find(post => post.post.userId === userId);
  }
  
  function getPostByPostId(postId) {
    return posts.find(post => post.post.postId === postId);
  }
  
  function getAllPosts() {
    return posts;
  }
  
  function getPostsFromFriends(userId) {
    // Implement logic to get posts from friends
    const userFollowed = getFollowed(userId);
    const friendPosts = posts.filter(post => userFollowed.includes(post.post.userId));
    return friendPosts;
  }
  
  function getPicturesFromPost(postId) {
    // Implement logic to get pictures associated with a post
    return Pictures.filter(picture => picture.postId === postId);
  }
  
  function addPost(caption, userId) {
    // Implement logic to add a new post
    const newPost = {
      post: {
        postId: posts.length + 1,
        caption,
        userId,
        uploadTime: new Date().toISOString()
      }
    };
    posts.push(newPost);
    return newPost;
  }
  
  function deletePost(postId) {
    // Implement logic to delete a post
    const index = posts.findIndex(post => post.post.postId === postId);
    if (index !== -1) {
      posts.splice(index, 1);
      return true; // Post deleted successfully
    }
    return false; // Post not found
  }
  
  export {
    getPostById,
    getPostByPostId,
    getAllPosts,
    getPostsFromFriends,
    getPicturesFromPost,
    addPost,
    deletePost,
    getFollowers,
    getFollowed,
    deleteFriendship,
    addFriendship,
  };
