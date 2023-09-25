import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext'; // Import your UserContext
import '../css/signin.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loggedin, setLoggedin, setUserID } = useContext(UserContext);
  const handleSignIn = () => {

    setLoggedin(true);
    setUserID(12345)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(); // Call the handleSignIn function when the form is submitted
    console.log('Email:', email);
    console.log('Password:', password);
    console.log(loggedin)
  };

  return (
    <div className="sign-in-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="sign-in-form">
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
