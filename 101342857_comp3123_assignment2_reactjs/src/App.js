import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { UserProvider } from './context/UserContext';

function App() {
  
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
