import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './contexts/userContext'; 
import { PostProvider } from './contexts/postContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import Modal from 'react-modal';

const rootElement = document.getElementById('root');
Modal.setAppElement(rootElement); 
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(rootElement);
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
