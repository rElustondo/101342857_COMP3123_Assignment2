var express = require("express")
var employeeRoutes = express.Router()
employeeRoutes.use(express.json())
const jwt = require("jsonwebtoken")
const EmployeeModel = require("../models/Employee")

const verifyToken = (req, res, next) => {
    const token = req.body.jwtToken;

    if (!token) {
        return res.status(401).json({ status: false, message: 'Unauthorized' });
    }

    jwt.verify(token, 'asd123asd123qweasdwrt', (err, decoded) => {
        if (err) {
        return res.status(401).json({ status: false, message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
};

employeeRoutes.get("/employees",verifyToken, async (req,res)=>{
    var employeeList = await EmployeeModel.find()
    res.status(200).json(employeeList)
})

function isValidEmail(email) {
    var expression = /\S+@\S+\.\S+/;
    return expression.test(email);
  }


employeeRoutes.post("/employees", verifyToken, async (req,res)=>{

    if(req.body == undefined){
        res.status(500).send({status:false,message:'employee object required as a json'})
    }
    if(!isValidEmail(req.body.email)){
        res.status(500).send({status:false,message:'Please enter valid email'})
    }
    var newEmployee = new EmployeeModel({
        ...req.body
    })
    await newEmployee.save()
    res.status(200).json(newEmployee)
   
})
//api/v1/emp/employees/{eid} GET DETAILS BY EMPLOYEE ID
employeeRoutes.get("/employees/:eid",verifyToken,async (req,res)=>{
    try {
        let eid = req.params.eid
        let employee = await EmployeeModel.findById(eid)
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json(error)
    }
})
employeeRoutes.put("/employees/:eid",verifyToken, async (req,res)=>{
    let eid = req.params.eid
    if(req.body == undefined){
        res.status(500).send({status:false,message:'updated employee object required as a json'})
    }
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(eid, req.body)
        res.status(200).json(updatedEmployee)
    } catch (error) {
        res.status(500).json(error)
    }
   
})
employeeRoutes.delete("/employees",verifyToken,async (req,res)=>{
    try{
        let eid = req.query.eid
        if(eid == undefined){
            res.status(500).json({status:false,message:'eid required as query parameter'})
        }
        const employee = await EmployeeModel.findOneAndDelete(eid)
        if(!employee){
            res.status(200).send({status:false, message: "Book Not found"})
        }
        else{
            res.status(200).send(book)
        }
    }catch(error){
        res.status(500).send(error)
    }
    
    
})

module.exports = employeeRoutes
