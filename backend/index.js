var express = require("express");
var userRoutes = require("./routes/User")
var employeeRoutes = require('./routes/Employee')
const mongoose = require('mongoose')
var SERVER_PORT = 8089

var app = express()
var apiV1 = express()

const DB_CONNECTION_STRING = "mongodb+srv://rodrigo:YHzLdkuvhwHQ8ZUZ@cluster0.bbqnvc3.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
var database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database connection  successfull')
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

apiV1.use("/user", userRoutes)
apiV1.use("/emp", employeeRoutes)

app.use("/api/v1", apiV1)

app.listen(SERVER_PORT,()=>{
    console.log("Server is running...")
})