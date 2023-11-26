import logo from './logo.svg';
import './App.css';
import {useContext, useState} from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserContext, { UserProvider } from './context/UserContext';
import Homepage from './components/Homepage';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';

export function useUser() {
  return useContext(UserContext);
}

function App() {
  const [userData, setUserData] = useState({});
  return (
    <UserProvider value={{userData,setUserData}}>
      <BrowserRouter>
        <Routes>
          <Route path="/add-employee/:id" element={<UpdateEmployee/>} />
          <Route path="/view-employee/:id" element={<ViewEmployee/>} />
          <Route path="/add-employee/_add" element={<AddEmployee/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/' element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
