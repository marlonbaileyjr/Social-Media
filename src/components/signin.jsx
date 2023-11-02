import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext'; // Import your UserContext
import { SignInUser } from '../functions/userFunctions';
import '../css/signin.css';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setLoggedin, setUserID } = useContext(UserContext);

    const handleSignIn = async () => {
        try {
          // Call the imported SignInUser function
          const data = await SignInUser(username, password);
          console.log(data)
      
          // If the call was successful, update the logged-in state and user ID
          setLoggedin(true);
          setUserID(data); // Adjust based on the actual structure of your response data
      
          alert('Signin successful');
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert('Incorrect password.');
          } else {
            console.error('Error during sign-in:', error.message || error);
          }
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignIn();
    };

  return (
    <div className="sign-in-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="sign-in-form">
            <div className="input-group">
                <label htmlFor="email">Username:</label>
                <input
                    type="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Sign In</button> 
        </form>
        <div className="link-group">
            <p>
                <Link to="/ForgotPassword">Forgot Password?</Link> 
            </p>
            <p>
                <Link to="/SignUp">No Account? Click Here to sign up!</Link>
            </p>
        </div>
    </div>
);
}

export default SignIn;