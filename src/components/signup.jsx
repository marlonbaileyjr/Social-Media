import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users } from '../hooks/userHooks'; 
import { useNavigate } from 'react-router-dom';

import { SignUpUser } from '../functions/userFunctions';

function SignUp() {
    const { setUserID } = Users();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState(''); // Date of Birth

    const goToPictureAndBio = (userId) => {
        navigate(`/addPictureBio/${userId}`);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await SignUpUser(firstName,lastName,username,email,password,dob);
            console.log(response)
            if (response.status === 200) {
                alert("Signed Up Successfully")
                const id= response.data.userId
                setUserID(Number(id))
                goToPictureAndBio(id)
            } else {
                alert('Sign-up failed:', response.message);
            }
        } catch (error) {
            alert('Sign-up error:', error);
        }
    };

    return (
        <div className="sign-in-container">
            <h2 className="common-font">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="common-button">Sign Up</button>
            </form>
            <p>
                <Link to="/">Already have an account? Sign In!</Link>
            </p>
        </div>
    );
}

export default SignUp;
