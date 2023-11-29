import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useUser } from '../App';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import '../App.css'
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
        <form onSubmit={(e) => onSubmitForm(e)} key={employeeDetails && JSON.stringify(employeeDetails)}>
            <div className='inputDiv'>
                <TextField defaultValue={employeeDetails&&employeeDetails.first_name} label="First Name" variant="standard" onChange={onValueChanged} name='first_name'  />
            </div>
            <div className='inputDiv'>
                <TextField defaultValue={employeeDetails&&employeeDetails.last_name} label="Last Name" variant="standard" onChange={onValueChanged} name='last_name' />
            </div>
            <div className='inputDiv'>
                <TextField defaultValue={employeeDetails&&employeeDetails.email} label="Email" variant="standard" onChange={onValueChanged} name='email'  />
            </div>
            <div className='inputDiv'>
                <TextField defaultValue={employeeDetails&&employeeDetails.gender} label="Gender" variant="standard" onChange={onValueChanged} name='gender'  />
            </div>
            <div className='inputDiv'>
                <TextField defaultValue={employeeDetails&&employeeDetails.salary} label="Salary" variant="standard" onChange={onValueChanged} name='salary' />
            </div>
            <Button type='submit' >Submit</Button>
        </form>
        <Button component={Link} to="/">Cancel</Button>
        {formSubmitted && <Navigate to={"/"}/>
        }
    </div>
  ) :  (
    <Navigate to={'/login'}/>
  )
}
