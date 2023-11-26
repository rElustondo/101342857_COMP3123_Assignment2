import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { useUser } from '../App';
import axios from 'axios';

export default function ViewEmployee() {
    const { id } = useParams();
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

    let selectedEmployee = empData[id]
   
    debugger
    return userData.jwt_token ? (
        <div>
            <h1>View Employee Details</h1>
            <h3>Employee First Name: {selectedEmployee && selectedEmployee.first_name}</h3>
            <h3>Employee Last Name: {selectedEmployee && selectedEmployee.last_name}</h3>
            <h3>Employee Email: {selectedEmployee && selectedEmployee.email}</h3>
            <h3>Employee Gender: {selectedEmployee && selectedEmployee.gender}</h3>
            <h3>Employee Salary: {selectedEmployee && selectedEmployee.salary}</h3>
        </div>
    ): (
        <Navigate to={'/login'}/>
    )
}
