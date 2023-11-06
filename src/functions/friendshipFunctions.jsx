import axios from "axios";

    async function getFollowed(userId) {
      try {
        const url = `http://localhost:8080/api/v1/friendship/followers/${userId}`;
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        alert("There was an error fetching the followed users: ", error);
        throw error; 
      }
    }
    
    async function getFollowers(userId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/friendship/${userId}`);
        return response.data;
      } catch (error) {
        alert('Error fetching followers users:', error);
        throw error;
      }
    }

    
    async function deleteFriendship(followerId, followedId) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/friendship/delete/${followerId}/${followedId}`);
        console.log('Delete response:', response.data);
      } catch (error) {
        alert('Error deleting friendship:', error);
      }
    }
    
    async function addFriendship(followerId, followedId) {
      const apiUrl = 'http://localhost:8080/api/v1/addFriendship';

      

      try {
        const now = new Date();

        let formattedDate = now.getFullYear() + '-' +
        ('0' + (now.getMonth() + 1)).slice(-2) + '-' + 
        ('0' + now.getDate()).slice(-2) + 'T' +
        ('0' + now.getHours()).slice(-2) + ':' +
        ('0' + now.getMinutes()).slice(-2) + ':' +
        ('0' + now.getSeconds()).slice(-2) + 'Z';
        
        const response = await axios.post(apiUrl,{
          follower: followerId,
          followed:followedId,
          uploadTime: formattedDate
      });
        console.log('Add Friendship Response:', response.data);
      } catch (error) {
        console.error('Error adding friendship:', error.response ? error.response.data : error.message);
      }
}

    async function checkFriendship(followerId, followedId){
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/friendship/exists/${followerId}/${followedId}`);
      if (response.data === 'Friendship exists'){
        return true
      }else{
        return false
      }
    } catch (error) {
      alert('Error checking friendship:', error);
    }
  }
    
    
    export {
      getFollowers,
      getFollowed,
      deleteFriendship,
      addFriendship,
      checkFriendship
    };