import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signin';
import Main from './components/main';
import { useContext } from 'react'; // Import useContext
import { UserContext } from './userContext'; // Import UserContext

function App() {
  const { loggedin } = useContext(UserContext); // Get the loggedin state from UserContext

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedin ? <Main /> : <SignIn />} />
        {/* Define more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;