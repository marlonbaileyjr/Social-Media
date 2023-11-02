import axios from "axios";

    async function getFollowers(userId) {
      try {
        const url = `http://localhost:8080/api/friendship/${userId}`;
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        alert("There was an error fetching the followed users: ", error);
        throw error; 
      }
    }
    
    async function getFollowed(userId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/friendship/${userId}`);
        return response.data;
      } catch (error) {
        alert('Error fetching followed users:', error);
        throw error;
      }
    }

    
    async function deleteFriendship(followerId, followedId) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/friendship/delete/${followerId}/${followedId}`);
        alert('Delete response:', response.data);
      } catch (error) {
        alert('Error deleting friendship:', error);
      }
    }
    
    async function addFriendship(followerId, followedId) {
      const apiUrl = 'http://localhost:8080/api/v1/addFriendship';
  
      try {
        const response = await axios.post(apiUrl,{
          follower: followerId,
          followed:followedId
      });
        console.log('Add Friendship Response:', response.data);
      } catch (error) {
        console.error('Error adding friendship:', error.response ? error.response.data : error.message);
      }
}

    async function checkFriendship(followerId, followedId){
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/friendship/delete/${followerId}/${followedId}`);
      alert('Delete response:', response.data);
    } catch (error) {
      alert('Error deleting friendship:', error);
    }
  }
    
    
    export {
      getFollowers,
      getFollowed,
      deleteFriendship,
      addFriendship,
      checkFriendship
    };