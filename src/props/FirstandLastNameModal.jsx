import React, { useState } from 'react';
import Modal from 'react-modal';
import { Users } from '../hooks/userHooks';
import { updateName as updateUserName } from '../functions/userFunctions';
import '../css/updateProfile.css';

function FirstAndLastNameModal({ isOpen, onClose, initialFirstName = '', initialLastName = '' }) {
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { userID } = Users();

    const updateName = async () => {
        setLoading(true);
        try {
            // Call the updateName function from userFunctions.js
            await updateUserName(userID, firstName, lastName);
            onClose(); // Close the modal on success
        } catch (error) {
            console.error('Error updating name:', error);
            setError('Failed to update name. Please try again later.'); // Set an error message
        }
        setLoading(false);
    };

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose} // This should only work when not loading
            style={customStyles}
            shouldCloseOnOverlayClick={!loading} // Prevent modal close when updating
        >
            <h2>Update Name</h2>
            {error && <div className="error-message">{error}</div>}
            <div>
                <label>First Name: </label>
                <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    disabled={loading}
                />
            </div>
            <div>
                <label>Last Name: </label>
                <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    disabled={loading}
                />
            </div>
            <button onClick={updateName} disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
            </button>
            <button onClick={onClose} disabled={loading}>Close</button>
        </Modal>
    );
}

export default FirstAndLastNameModal;
