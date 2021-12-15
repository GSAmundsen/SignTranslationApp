import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Login from './views/Login';
import Profile from './views/Profile';
import Translate from './views/Translate';
import Navbar from './components/NavBar/NavBar';

//something something

function App() {
  
  return (
    //Wrapping the "App" in a BrowserRouter object.
    <BrowserRouter>
    {/* this handles the entire page, and loads each page as needed.*/}
    <div className="App">
      <Navbar />

      <Routes>
        {/* this element is the Login page, defined in Login.jsx*/}
        <Route path="/" element={<Login />} />
        {/* this element is the Login page, defined in Profile.jsx*/}
        <Route path="/profile" element={<Profile />} />
        {/* this element is the Login page, defined in Translate.jsx*/}
        <Route path="/translate" element={<Translate />} />        
      </Routes>
      
    </div>

    </BrowserRouter>
  );
}

export default App;
