import { useContext } from "react";
import { PostContext } from "../contexts/postContext";


export function usePosts() {
    const context = useContext(PostContext);
    if (context === undefined) {
      throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
  }