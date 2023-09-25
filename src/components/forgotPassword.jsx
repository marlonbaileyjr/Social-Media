import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/signin.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Function to handle the email sending logic can be added here.
        console.log('Email to send reset link:', email);
    };

    return (
        <div className="sign-in-container">
            <h2 className="common-font">Forgot Password</h2>
            <p>Enter your email to receive password reset instructions.</p>
            <form onSubmit={handleSubmit} className="sign-in-form">
                <div className="input-group">
                    <label htmlFor="email" className="common-font">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="common-font"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="common-button">Send Email</button>
            </form>
            <p>
                <Link to="/">Back to Sign In</Link>
            </p>
        </div>
    );
}

export default ForgotPassword;
