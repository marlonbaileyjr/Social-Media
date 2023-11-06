import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './contexts/userContext'; // Make sure this path is correct
import { PostProvider } from './contexts/postContext'; // Make sure this path is correct
import { LikeProvider } from './contexts/likeContext';
import { FriendProvider } from './contexts/friendshipContext';
import { CommentProvider } from './contexts/commentContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <PostProvider>
          <LikeProvider>
          <CommentProvider>
          <FriendProvider>
          <App />
          </FriendProvider>
          </CommentProvider>
          </LikeProvider>
        </PostProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
