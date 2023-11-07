import { createContext, useState } from 'react';

export const UserContext = createContext({
  userID: '',
  setUserID: () => {},
  loggedin: false,
  setLoggedin: () => {},
  paramUserId:'',
  setParam:() => {},
});

export function UserContextProvider(props) {
  const [loggedin, setLoggedin] = useState(false);
  const [userID, setUserID] = useState('');
  const [paramUserId, setParam] = useState('')




  return (
    <UserContext.Provider
      value={{ 
        loggedin, 
        setLoggedin, 
        userID, 
        setUserID,
        setParam,
        paramUserId }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
