import React, { useState } from 'react';
import Modal from 'react-modal';
import updateProfile from '../css/updateProfile.css'

Modal.setAppElement('#root');

function BioAndUsernameModal({ initialBio = '', initialUsername = '' }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [bio, setBio] = useState(initialBio);
    const [username, setUsername] = useState(initialUsername);

    const updateProfile = () => {
        console.log("Updated profile:", bio, username);
        setModalIsOpen(false);
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <h2>Update Profile</h2>
                <div>
                    <label>Username: </label>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Bio: </label>
                    <textarea
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    />
                </div>
                <button onClick={updateProfile}>Update</button>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}

export default BioAndUsernameModal;
