import axios from 'axios';
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createPost(caption, userId) {
  console.log('create', caption, userId)
  const url = 'http://localhost:8080/api/v1/posts';
  // Create a new Date object and format it as an ISO string
  const uploadTime = new Date().toISOString();

  const body = {
    caption: caption,
    userId: userId,
    uploadTime: uploadTime // Use the generated timestamp
  };

  try {
    const response = await axios.post(url, body);
    return response.data
  } catch (error) {
    console.error('Error creating the post', error.response);
  }
}

async function fetchPosts() {
  const url = 'http://localhost:8080/api/v1/posts';
  //await delay(4000);

  try {
    const response = await axios.get(url);
    console.log('Posts fetched successfully', response.data);
    // handle the response data
    return response.data; // returning the posts data
  } catch (error) {
    console.error('Error fetching the posts', error.response);
    // handle the error as needed
    throw error; // throwing the error to be handled by the caller
  }
}

async function deletePost(postId) {
  const url = `http://localhost:8080/api/v1/posts/delete/${postId}`;

  try {
    const response = await axios.delete(url);
    console.log('Post deleted successfully', response.data);
    // handle the response as needed
  } catch (error) {
    console.error('Error deleting the post', error.response);
    // handle the error as needed
    throw error; // throwing the error for further handling if needed
  }
}

async function retrievePostByUserId(userId){
  const url = `http://localhost:8080/api/v1/posts/getPosts/${userId}`
  try {
    const response = await axios.get(url);
    console.log('Post retrieved successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving the post', error.response);
    throw error;
  }
}

async function retrieveFriendPosts(userId){
  const url = `http://localhost:8080/api/v1/posts/retrievePost/${userId}`
  
  try {
    const response = await axios.get(url);
    console.log('Post retrieved successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving the post', error.response);
    throw error;
  }
  }

async function getPostByPostId(postId) {
  const url = `http://localhost:8080/api/v1/posts/getPost/${postId}`;

  try {
    const response = await axios.get(url);
    console.log('Post retrieved successfully:', response.data);
    // Process the response data as needed
    return response.data; // Return the post data
  } catch (error) {
    console.error('Error retrieving the post:', error.response);
    // Handle the error as needed
    throw error; // Throw the error to be handled by the caller
  }
}

async function updatePost(postId, caption, userId) {
  const url = `http://localhost:8080/api/v1/posts/update/${postId}`;
  const body = {
    caption: caption,
    userId: userId,
    uploadTime: new Date().toISOString()
  };

  try {
    const response = await axios.put(url, body);
    console.log('Post updated successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating the post', error.response);
    throw error;
  }
}

async function uploadPostPicture(postId, order, mediaFile) {
  console.log('uploadpics', postId, order, mediaFile)
  const url = `http://localhost:8080/api/v1/posts/pictures/${postId}`;
  
  const formData = new FormData();
  formData.append('type', 'image');
  formData.append('order', order);
  formData.append('media', mediaFile);
  formData.append('uploadTime', new Date().toISOString());

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const response = await axios.post(url, formData, config);
    console.log('Picture uploaded successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading the picture', error.response);
    throw error;
  }
}
  
async function getLatestPicture(postId) {
  const url = `http://localhost:8080/api/v1/posts/getLatestPicture/${postId}`;

  try {
    const response = await axios.get(url);
    console.log('Received latest picture data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching the latest picture', error.response);
    throw error;
  }
}

async function getPostMedia(postID) {
  const url = `http://localhost:8080/api/v1/posts/media/${postID}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching the post media', error.response);
    throw error;
  }
}

  export {
    createPost,
    fetchPosts,
    deletePost,
    getPostByPostId,
    updatePost,
    retrievePostByUserId,
    uploadPostPicture,
    getLatestPicture,
    getPostMedia,
    retrieveFriendPosts


  };
