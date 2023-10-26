import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function FirstAndLastNameModal({ initialFirstName = '', initialLastName = '' }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);

    const updateName = () => {
        console.log("Updated name:", firstName, lastName);
        setModalIsOpen(false);
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
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
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}

export default FirstAndLastNameModal;
