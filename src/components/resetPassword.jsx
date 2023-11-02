import React, { useState } from 'react';
import { updatePassword } from '../functions/userFunctions'; // Adjust the path as necessary

function ResetPassword() {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Here we call the updatePassword function which should be an API call
      const response = await updatePassword(email, password);

      // Handle the response according to your application's needs
      if (response.success) {
        alert('Password has been updated successfully!');
      } else {
        alert('Failed to update password. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred while updating the password.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
