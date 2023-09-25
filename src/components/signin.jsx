import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext'; // Import your UserContext
import '../css/styles.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loggedin, setLoggedin } = useContext(UserContext);
  const handleSignIn = () => {

    setLoggedin(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(); // Call the handleSignIn function when the form is submitted
    console.log('Email:', email);
    console.log('Password:', password);
    console.log(loggedin)
  };

  return (
    <div>
      <h2 className="common-font">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="common-font" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="common-font" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="common-button">Sign In</button> 
      </form>
      <p>
        <Link to="/ForgotPassword">Forgot Password?</Link> 
      </p>
      <p>
        <Link to="/ResetPassword">No Account? Click Here to sign up!</Link>
      </p>
    </div>
  );
}

export default SignIn;
