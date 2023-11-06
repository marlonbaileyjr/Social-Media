import axios from "axios";

async function getLikes(postId) { 
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/likes/getLikes/${postId}`);
    console.log('like data', response.data); // The response data from the server
    return response.data; // Assuming the response data is the list of likes
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // If the error is a 404, log it and return an empty array
      console.log('No likes found, returning empty array.');
      return [];
    } else {
      // For any other errors, log the full error
      console.error('Error fetching likes:', error);
      throw error; // Optional: re-throw the error if you want calling code to handle it
    }
  }
};

  
async function addLike(userId, postId) {
  console.log('addlike',userId,postId)
  try {
    const now = new Date();

    // Format the date and time in 'YYYY-MM-DDTHH:mm:ssZ' format
    let formattedDate = now.getFullYear() + '-' +
      ('0' + (now.getMonth() + 1)).slice(-2) + '-' + 
      ('0' + now.getDate()).slice(-2) + 'T' +
      ('0' + now.getHours()).slice(-2) + ':' +
      ('0' + now.getMinutes()).slice(-2) + ':' +
      ('0' + now.getSeconds()).slice(-2) + 'Z';

    const response = await axios.post('http://localhost:8080/api/v1/likes', {
      userId: userId,
      postId: postId,
      uploadTime: formattedDate 
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

  
  async function deleteLike(likeId) {
    console.log('dellike',likeId)
    const url = `http://localhost:8080/api/v1/likes/delete/${likeId}`;

    axios.delete(url)
      .then(response => {
        // Handle the response from the server
        console.log('Deleted successfully:', response.data);
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error deleting the like:', error.response ? error.response.data : error.message);
      });
  }
  
  export { getLikes, addLike, deleteLike };
  