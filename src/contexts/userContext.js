import { createContext, useState } from 'react';
import {getUserById, searchUser, SignUpUser, SignInUser, updatePassword, updateUsernameAndBio,updateBio, updateName, updateProfilePicture,} from '../functions/userFunctions'


export const UserContext = createContext({
  userID: '',
  setUserID: () => {},
  loggedin: false,
  setLoggedin: () => {}
});

export function UserContextProvider(props) {
  const [loggedin, setLoggedin] = useState(false);
  const [userID, setUserID] = useState('');

  return (
    <UserContext.Provider
      value={{ loggedin, setLoggedin, userID, setUserID }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
