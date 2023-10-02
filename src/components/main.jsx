import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../userContext';
import '../css/styles.css';
import ScrollScreen from '../props/ScrollScreen';
import { getPostsFromFriends, getAllPosts } from '../functions/postFunctions';

function Main() {
  const { userID } = useContext(UserContext);
  const [currentItems, setCurrentItems] = useState([]); // Initialize with an empty array
  const [selectedOption, setSelectedOption] = useState('Following');

  useEffect(() => {
    // Use the userID to fetch the appropriate post data based on the selected option
    if (selectedOption === 'Following') {
      const postsFromFriends = getPostsFromFriends(userID);
      setCurrentItems(postsFromFriends);
    } else if (selectedOption === 'Discover') {
      const allPosts = getAllPosts();
      setCurrentItems(allPosts);
    }
  }, [userID, selectedOption]);

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
