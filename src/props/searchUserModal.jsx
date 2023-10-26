import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function UserSearchModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
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

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Search Users</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
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
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}

export default UserSearchModal;
