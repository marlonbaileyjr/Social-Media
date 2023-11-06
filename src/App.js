import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/signin';
import Main from './components/main';
import Header from './components/header';
import UploadPage from './components/UploadPage';
import ForgotPassword from './components/forgotPassword';
import SignUp from './components/signup';
import ProfilePage from './components/profile';
import ProfilePictureAndBio from './components/profilePictureAndBio';
import {Users} from './hooks/userHooks'
import {usePosts} from './hooks/postHooks'
import LoadingScreen from './components/loadingScreen'

function App() {
  const {isPostsLoading} = usePosts()
  const { loggedin } = Users();

  if (isPostsLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      {loggedin ? <Header /> : null}
      
      <Routes>
        {loggedin ? (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile/:USER_ID" element={<ProfilePage />} />
            <Route path="/addPictureBio/:userId" element={<ProfilePictureAndBio />} />
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
