import { useContext } from "react";
import { CommentContext } from "../contexts/commentContext";


export function useComments() {
    const context = useContext(CommentContext);
    if (context === undefined) {
      throw new Error('useComments must be used within a CommentProvider');
    }
    return context;
  }