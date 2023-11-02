import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { searchUser } from '../functions/userFunctions';
import '../css/updateProfile.css';

function UserSearchModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const performSearch = async () => {
            if (searchTerm.trim()) {
                setIsSearching(true);
                try {
                    const data = await searchUser(searchTerm);
                    setResults(data); 
                } catch (error) {
                    console.error('Search failed:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setResults([]);
            }
        };
        performSearch();
    }, [searchTerm]);

    const navigateToUserProfile = (userId) => {
        navigate(`/profile/${userId}`);
        onClose()
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
                    <button onClick={() => setSearchTerm(searchTerm)} disabled={isSearching}>
                        {isSearching ? 'Searching...' : 'Search'}
                    </button>
                </div>
                <div className="search-results">
                    {results.length > 0 ? (
                        results.map(user => (
                            <div key={user.username} className="user-result" onClick={() => navigateToUserProfile(user.userId)}>
                                <strong>{user.username}</strong>
                                <p>{user.firstName} {user.lastName}</p>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
                <button onClick={onClose}>Close</button>
            </Modal>
        </div>
    );
}

export default UserSearchModal;
