import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import ScrollScreen from '../props/ScrollScreen';
import {usePosts} from '../hooks/postHooks'


function Main() {
  
  const {posts, friendPosts} = usePosts()
  const [currentItems, setCurrentItems] = useState([]); // Initialize with an empty array
  const [selectedOption, setSelectedOption] = useState('Following');


  useEffect(() => {
        if (selectedOption === 'Following') {
        setCurrentItems(friendPosts);
        }else{
          setCurrentItems(posts)
        }

  }, [friendPosts, posts, selectedOption]); 


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
