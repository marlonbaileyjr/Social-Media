import React from 'react';
import '../css/LoadingScreen.css'; // Assume you have some CSS for styling

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="spinner">
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;