import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updatePassword } from '../functions/userFunctions'; // Adjust the path as necessary
import '../css/signin.css';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const GoToSignIn = () => {
      navigate(`/`);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          // Here we call the updatePassword function which should be an API call
          const response = await updatePassword(email, password);
          console.log(response)
    
          // Handle the response according to your application's needs
          if (response.status===200) {
            alert('Password has been updated successfully!');
            GoToSignIn()

          } else {
            alert('Failed to update password. Please try again later.');
          }
        } catch (error) {
          console.error('Error updating password:', error);
          alert('An error occurred while updating the password.');
        }
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
                    <label htmlFor="password" className="common-font">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="common-font"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="common-button">Update Password</button>
            </form>
            <p>
                <Link to="/">Back to Sign In</Link>
            </p>
        </div>
    );
}

export default ForgotPassword;
