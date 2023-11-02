import axios from 'axios';

async function getUserById(userId) {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);

    if (response.status === 200) {
        const user = response.data;
        return {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          profilePicture: user.profilePicture,
          bio: user.bio
        };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
        throw new Error('No User Found');
    } else {
        console.error('Error during user retrieval:', error.message || error);
        throw new Error(error.message || 'An error occurred during user retrieval.');
    }
  }
}


async function searchUser(input) {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/users/searchUser/${input}`);

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to retrieve user data.');
    }
  } catch (error) {
    console.error('Error searching user:', error.message || error);
    throw error;
  }
}
  

async function SignUpUser(firstName, lastName, userName, email, password, dateOfBirth) {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/users/signup', {
        firstName,
        lastName,
        userName: userName,
        email,
        password,
        dateOfBirth: dateOfBirth,
        dateJoined: new Date().toISOString().slice(0, 10)
    });

    if (response.status === 200 || response.status === 201) {
        alert('Registration successful');
    } else {
        alert('Registration failed');
    }

} catch (error) {
    console.error('Error during registration:', error);
}
}

async function SignInUser(userName, password) {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/users/signin', {
        userName: userName,
        password: password
    });

    if (response.status === 200) {
      return response.data;
    }
} catch (error) {
    if (error.response && error.response.status === 401) {
        alert('Incorrect password.');
    } else {
        console.error('Error during sign-in:', error.message || error);
    }
}
}

async function updatePassword(email, newPassword) {
  try {
      const requestBody = {
      email: email,
      newPassword: newPassword
    };

    const response = await axios.put('http://localhost:8080/api/v1/users/updatePassword', requestBody);

    if (response.status === 200) {
      console.log('Password updated successfully');
    } else {
      console.error('Failed to update password. Status code:', response.status);
      throw new Error(`Failed to update password. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating password:', error.message || error);
    throw error;
  }
}


async function updateUsernameAndBio(userId, newUsername, newBio) {
  try {
    // Prepare the request body
    const requestBody = {
      userId: userId,
      newUsername: newUsername,
      newBio: newBio
    };

    // Make a POST request to the updateUsernameAndBio endpoint
    const response = await axios.put('http://localhost:8080/api/v1/users/updateUsernameAndBio', requestBody);

    // Check if the response has a status code of 200 (OK) or another success status
    if (response.status === 200) {
      // Optionally, return the response data if it contains any relevant information
      return response.data;
    } else {
      console.error('Failed to update username and bio. Status code:', response.status);
      throw new Error(`Failed to update username and bio. Status code: ${response.status}`);
    }
  } catch (error) {
    // Log the error
    console.error('Error updating username and bio:', error.message || error);
    throw error;
  }
}


async function updateProfilePicture(userID, file) {
  try {
    let formData = new FormData();
    formData.append('profilePicture', file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.put(`http://localhost:8080/api/v1/users/updateProfilePicture/${userID}`, formData, config);

    if (response.status === 200) {
      console.log('Profile picture updated successfully.');
      return response.data;
    } else {
      console.error('Failed to update profile picture. Status code:', response.status);
      throw new Error(`Failed to update profile picture. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating profile picture:', error.message || error);
    throw error;
  }
}


async function updateName(userId, newFirstName, newLastName) {
  try {
    const requestBody = {
      userId: userId,
      newFirstName: newFirstName,
      newLastName: newLastName
    };

    const response = await axios.put('http://localhost:8080/api/v1/users/updateFirstNameAndLastName', requestBody);

    if (response.status === 200) {
      console.log('Name updated successfully');
      return response.data;
    } else {
      console.error('Failed to update name. Status code:', response.status);
      throw new Error(`Failed to update name. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating name:', error.message || error);
    throw error;
  }
}


async function updateBio(userId, newBio) {
  try {
    const requestBody = {
      userId: userId,
      newBio: newBio
    };

    const response = await axios.post('http://localhost:8080/api/v1/users/updateBio', requestBody);

    if (response.status === 200) {
      console.log('Bio updated successfully.');
      return response.data;
    } else {
      console.error('Failed to update bio. Status code:', response.status);
      throw new Error(`Failed to update bio. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating bio:', error.message || error);
    throw error;
  }
}

export {
  getUserById,
  searchUser,
  SignUpUser,
  SignInUser,
  updatePassword,
  updateUsernameAndBio,
  updateBio,
  updateName,
  updateProfilePicture,

};
