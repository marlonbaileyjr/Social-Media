export const friendships=[
    {
        "friendshipId": 1,
        "follower": 1,
        "followed": 2,
        "uploadTime": "2023-09-29T12:00:00Z"  
      },
      {
        "friendshipId": 2,
        "follower": 3,
        "followed": 4,
        "uploadTime": "2023-09-29T12:05:00Z"  
      },
      {
        "friendshipId": 3,
        "follower": 5,
        "followed": 3,
        "uploadTime": "2023-09-29T12:10:00Z"  
      },
      {
        "friendshipId": 4,
        "follower": 2,
        "followed": 5,
        "uploadTime": "2023-09-29T12:15:00Z"  
      },
      {
        "friendshipId": 5,
        "follower": 4,
        "followed": 1,
        "uploadTime": "2023-09-29T12:20:00Z"  
      }
    ]

    function getFollowers(userId) {
      return friendships
        .filter(friendship => friendship.followed === userId)
        .map(friendship => friendship.follower);
    }
    
    function getFollowed(userId) {
      return friendships
        .filter(friendship => friendship.follower === userId)
        .map(friendship => friendship.followed);
    }
    
    function deleteFriendship(followerId, followedId) {
      const index = friendships.findIndex(
        friendship => friendship.follower === followerId && friendship.followed === followedId
      );
      if (index !== -1) {
        friendships.splice(index, 1);
        return true; // Friendship deleted successfully
      }
      return false; // Friendship not found
    }
    
    function addFriendship(followerId, followedId) {
      const existingFriendship = friendships.find(
        friendship => friendship.follower === followerId && friendship.followed === followedId
      );
    
      if (existingFriendship) {
        return false; // Friendship already exists
      }
    
      const newFriendship = {
        friendshipId: friendships.length + 1, // Generate a new unique friendshipId
        follower: followerId,
        followed: followedId,
        uploadTime: new Date().toISOString(), // Set the current date as the uploadTime
      };
    
      friendships.push(newFriendship);
      return true; // Friendship added successfully
    }
    
    
    export {
      getFollowers,
      getFollowed,
      deleteFriendship,
      addFriendship,
    };