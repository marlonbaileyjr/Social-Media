import React, { useState } from 'react';
import '../css/styles.css';
import ScrollScreen from '../props/ScrollScreen';
import {items, items2} from '../data'


function Main() {
  const [currentItems, setCurrentItems] = useState(items);
  const [selectedOption, setSelectedOption] = useState('Following');

  const handleClick = (option) => {
    setSelectedOption(option);
    if (option === 'Following') {
      setCurrentItems(items);
      //set div #2c3e50
    } else if (option === 'Discover') {
      setCurrentItems(items2);
    }
  }

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
