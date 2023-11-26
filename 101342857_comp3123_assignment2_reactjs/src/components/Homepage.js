import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';
import { useUser } from '../App';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

export default function Homepage() {
    const { userData, setUserData } = useUser();
    let [empData, setEmpData] = useState([])
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
    },[userData])
    
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
                                <Link>Delete</Link>
                            </div>
                            <div>
                                <Link to={`/view-employee/${i}`}>View</Link>
                            </div>
                        </div>
                    </td>
                </tr>)}
               
            </table>
            <NavLink to="/add-employee/_add">Add Employee</NavLink>
        </div>
    ) : (
        <Navigate to={'/login'}/>
    )
}
