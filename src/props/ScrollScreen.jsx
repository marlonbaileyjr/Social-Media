import React, { useState } from 'react';
import '../css/ScrollScreen.css';

function ScrollScreen({ items }) {
  const [activeIndex, setActiveIndex] = useState(0); // Current active item
  const [startY, setStartY] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    if (startY == null) return;

    const diffY = startY - endY;

    // Threshold for considering it a swipe
    if (Math.abs(diffY) > 50) {
      if (diffY > 0 && activeIndex < items.length - 1) {
        // Swipe up
        setActiveIndex((prevIndex) => prevIndex + 1);
      } else if (diffY < 0 && activeIndex > 0) {
        // Swipe down
        setActiveIndex((prevIndex) => prevIndex - 1);
      }
    }
    setStartY(null);
  };

  const prevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const nextItem = () => {
    if (activeIndex < items.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartY(null);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || startY === null) return;

    const currentY = e.clientY;
    const diffY = startY - currentY;

    // Set a threshold for detecting a "drag", e.g., 50 pixels
    if (diffY > 50 && activeIndex < items.length - 1) {
      setActiveIndex((prev) => prev + 1);
      setIsDragging(false);
      setStartY(null);
    } else if (diffY < -50 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      setIsDragging(false);
      setStartY(null);
    }

    if (!isDragging || startY === null) return;

  };

  return (
    <div 
      className="scroll-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {items.map((item, index) => (
        <div key={index} className={`scroll-item ${index === activeIndex ? 'active' : ''}`}>
          <img 
            src={item.imageUrl} 
            alt={item.caption} 
            onDragStart={preventDragHandler} // Add this event handler
          />
          <p>{item.caption}</p>
        </div>
      ))}
      <button className="prev-button" onClick={prevItem}>Previous</button>
      <button className="next-button" onClick={nextItem}>Next</button>
    </div>
  );
}



export default ScrollScreen;
