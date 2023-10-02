import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext'; // Import your UserContext
import '../css/signin.css';
import {SignInUser} from '../functions/userFunctions.jsx'

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setLoggedin, setUserID } = useContext(UserContext);
  
  const handleSignIn = async () => {
    const success = await SignInUser(username, password); // Call the signin function

    if (success) {
      setLoggedin(true);
      setUserID(1);
      console.log('Signin successful');
    } else {
      // Signin failed, you can display an error message
      console.error('Signin failed');
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
                    type="text"
                    id="text"
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
