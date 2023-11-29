import logo from './logo.svg';
import './App.css';
import {useContext, useEffect, useState} from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserContext, { UserProvider } from './context/UserContext';
import Homepage from './components/Homepage';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import Signup from './components/Signup';
import Container from '@mui/material/Container';

export function useUser() {
  return useContext(UserContext);
}

function App() {
  let savedUser = JSON.parse(localStorage.getItem("user"))
 

  const [userData, setUserData] = useState({});
  if(savedUser && !(userData && userData.jwt_token))setUserData(savedUser)
  return (
    <UserProvider value={{userData,setUserData}}>
      <BrowserRouter>
        <nav>
          <NavLink to="/"><h1>Employee Management App</h1></NavLink>
        </nav>
        <Container style={{width: "fit-content"}} >
          <Routes>
            <Route path="/add-employee/:id" element={<UpdateEmployee/>} />
            <Route path="/view-employee/:id" element={<ViewEmployee/>} />
            <Route path="/add-employee/_add" element={<AddEmployee/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path='/' element={<Homepage/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
