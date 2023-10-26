import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/updateProfile.css';

function FirstAndLastNameModal({ isOpen, onClose, initialFirstName = '', initialLastName = '' }) {
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);

    const updateName = () => {
        console.log("Updated name:", firstName, lastName);
        onClose(); // call the passed onClose method
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
            onRequestClose={onClose} // calling the external close handler
            style={customStyles}
        >
            <h2>Update Name</h2>
            <div>
                <label>First Name: </label>
                <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label>Last Name: </label>
                <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            </div>
            <button onClick={updateName}>Update</button>
            <button onClick={onClose}>Close</button> {/* calling the external close handler */}
        </Modal>
    );
}

export default FirstAndLastNameModal;
