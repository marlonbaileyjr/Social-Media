import { useContext } from "react";
import { UserContext } from '../contexts/userContext';


export function Users() {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
  }