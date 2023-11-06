import { createContext, useState } from 'react';

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
      value={{ 
        loggedin, 
        setLoggedin, 
        userID, 
        setUserID }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
