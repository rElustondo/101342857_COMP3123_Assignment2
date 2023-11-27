import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';
import { useUser } from '../App';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

export default function Homepage() {
    const { userData, setUserData } = useUser();
    let [empData, setEmpData] = useState([])
    let [deletedID, setDeletedID] = useState(null)
    debugger
    useEffect(()=>{
        debugger
        const getEmployees = async ()=>{
            try {
                const employeeData = await axios.get(
                    "http://localhost:8089/api/v1/emp/employees/",
                    {
                        headers: {
                            Authorization: userData.jwt_token
                        }
                    }
                );
                
                setEmpData(employeeData.data)
            } catch (error) {
                console.log(error)
            }
        }
        if(userData && userData.jwt_token){
            getEmployees()
        }
    },[userData,deletedID])
    
    const deleteButton = async (id) => {
        debugger
        try {
            debugger
            const response = await axios.delete(`http://localhost:8089/api/v1/emp/employees?eid=${id}`,{
                headers: {
                    Authorization: userData.jwt_token
                }
            })
            debugger
            
            console.log("deleted", response)
            setDeletedID(response.data._id)
        } catch (error) {
            console.log(error)
        }
    }
    const signOut = ()=>{
        localStorage.removeItem("user");
        setUserData({})
    }
    return userData.jwt_token ? (
        <div>
            {`Welcome, ${userData.username}`}
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                {empData.map((emp,i)=> <tr>
                    <td>{emp.first_name}</td>
                    <td>{emp.last_name}</td>
                    <td>{emp.email}</td>
                    <td>
                        <div>
                            <div>
                                <Link to={`/add-employee/${i}`}>Update</Link>
                            </div>
                            <div>
                                <button onClick={()=>{deleteButton(emp._id)}}>Delete</button>
                            </div>
                            <div>
                                <Link to={`/view-employee/${i}`}>View</Link>
                            </div>
                        </div>
                    </td>
                </tr>)}
               
            </table>
            <NavLink to="/add-employee/_add">Add Employee</NavLink>
            <button onClick={()=>{signOut()}}>log out</button>
        </div>
    ) : (
        <Navigate to={'/login'}/>
    )
}
