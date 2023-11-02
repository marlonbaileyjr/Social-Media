import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../userContext';
import '../css/styles.css';
import ScrollScreen from '../props/ScrollScreen';
import { getPostsFromFriends, getAllPosts } from '../functions/postFunctions';

function Main() {
  
  const { userID } = useContext(UserContext);
  const [currentItems, setCurrentItems] = useState([]); // Initialize with an empty array
  const [selectedOption, setSelectedOption] = useState('Following');
console.log("currrent", currentItems)
useEffect(() => {
  const fetchData = async () => {
    if (selectedOption === 'Following') {
      try {
        const postsFromFriends = await getPostsFromFriends(userID);
        setCurrentItems(postsFromFriends);
      } catch (error) {
        console.error('Error fetching posts from friends:', error);
        setCurrentItems([]); // or set to a default value or state
      }
    } else if (selectedOption === 'Discover') {
      try {
        const allPosts = await getAllPosts();
        setCurrentItems(allPosts);
      } catch (error) {
        console.error('Error fetching all posts:', error);
        setCurrentItems([]); // or set to a default value or state
      }
    }
  };

  fetchData();
}, [userID, selectedOption]); // Dependencies array


  const handleClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="selection-bar">
        <div
          className={`option-div ${selectedOption === 'Following' ? 'active' : ''}`}
          onClick={() => handleClick('Following')}
        >
          <p>Following</p>
        </div>
        <div
          className={`option-div ${selectedOption === 'Discover' ? 'active' : ''}`}
          onClick={() => handleClick('Discover')}
        >
          <p>Discover</p>
        </div>
      </div>
      <ScrollScreen items={currentItems} />
    </div>
  );
}

export default Main;
