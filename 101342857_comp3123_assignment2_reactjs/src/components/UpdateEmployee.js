import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useUser } from '../App';
import axios from 'axios';

export default function UpdateEmployee() {
    const { id } = useParams();
    const { userData, setUserData } = useUser();
    const [formSubmitted, setFormSubmitted] = useState(false)
    let [empData, setEmpData] = useState([])
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
    const [employeeDetails, setEmployeeDetails] = useState(selectedEmployee)
    useEffect(()=>{
        setEmployeeDetails(selectedEmployee)
    },[empData])
   debugger
    
    const onValueChanged = (event) => {
        setEmployeeDetails({
            ...employeeDetails,
            [event.target.name]: event.target.value
        })
    }
    const onSubmitForm = async (event) => {
        event.preventDefault()
        debugger
        try {
            var res = await axios.put(`http://localhost:8089/api/v1/emp/employees/${employeeDetails._id}`,
             {
                first_name:employeeDetails.first_name,
                last_name:employeeDetails.last_name,
                email:employeeDetails.email,
                gender:employeeDetails.gender,
                salary:employeeDetails.salary,
                jwtToken:userData.jwt_token})
            console.log(res)
          
        } catch (error) {
            console.log(error)
        }
        setFormSubmitted(true)
        console.log('Form Submitted: ' + JSON.stringify(employeeDetails))
    }
    return userData.jwt_token ? (
    <div>
        <h1>Update Employee</h1>
        <form onSubmit={(e) => onSubmitForm(e)}>
            <div>
                <h3>First Name</h3>
                <input type='text' defaultValue={employeeDetails&&employeeDetails.first_name} onChange={onValueChanged} placeholder='first name' name='first_name'/>
            </div>
            <div>
                <h3>Last Name</h3>
                <input type='text' defaultValue={employeeDetails&&employeeDetails.last_name} onChange={onValueChanged} placeholder='last name' name='last_name'/>
            </div>
            <div>
                <h3>Email</h3>
                <input type='text'  defaultValue={employeeDetails&&employeeDetails.email} onChange={onValueChanged} placeholder='email' name='email'/>
            </div>
            <div>
                <h3>Gender</h3>
                <input type='text'  defaultValue={employeeDetails&&employeeDetails.gender} onChange={onValueChanged} placeholder='gender' name='gender'/>
            </div>
            <div>
                <h3>Salary</h3>
                <input type='text'  defaultValue={employeeDetails&&employeeDetails.salary} onChange={onValueChanged} placeholder='salary' name='salary'/>
            </div>
            <input type='submit' />
        </form>
        <Link to="/">Cancel</Link>
        {formSubmitted && <Navigate to={"/"}/>
        }
    </div>
  ) :  (
    <Navigate to={'/login'}/>
  )
}
