import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/signin';
import Main from './components/main';
import Header from './components/header';
import UploadPage from './components/UploadPage';
import ForgotPassword from './components/forgotPassword';
import SignUp from './components/signup';
import ProfilePage from './components/profile';
import { useContext } from 'react';
import { UserContext } from './userContext';

function App() {
  const { loggedin } = useContext(UserContext);

  return (
    <Router>
      {loggedin ? <Header /> : null}
      
      <Routes>
        {loggedin ? (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile/:USER_ID" element={<ProfilePage />} />
          </>
        ) : (
          <>
          <Route path="/" element={<SignIn />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/SignUp' element={<SignUp />} />
          </>
        )}
      </Routes>
      
      {/*loggedin ? <Footer /> : null*/}
    </Router>
  );
}

export default App;
