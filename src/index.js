import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './contexts/userContext'; // Make sure this path is correct
import { PostProvider } from './contexts/postContext'; // Make sure this path is correct
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <PostProvider>

            <App />

        </PostProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
