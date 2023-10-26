import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

function UserSearchModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    // Simulated search function (You would replace this with your API call)
    const performSearch = (query) => {
        // Simulated data, replace with actual data from API
        const data = [
            { username: 'john_doe', firstName: 'John', lastName: 'Doe' },
            { username: 'jane_doe', firstName: 'Jane', lastName: 'Doe' },
            // ... more users
        ];

        setResults(data.filter(user => user.username.includes(query)));
    };

    const navigateToUserProfile = (userID) => {
        navigate(`/profile/${userID}`);
      };

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '60%', 
          height: '70%'
        },
      };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={customStyles}
            >
                <div className="search-bar">
                    <input
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search for a user..."
                    />
                    <button onClick={() => performSearch(searchTerm)}>Search</button>
                </div>
                <div className="search-results">
                    {results.map(user => (
                        <div key={user.username} className="user-result">
                            <strong>{user.username}</strong>
                            <p>{user.firstName} {user.lastName}</p>
                        </div>
                    ))}
                </div>
                <button onClick={onClose}>Close</button>
            </Modal>
        </div>
    );
}

export default UserSearchModal;
