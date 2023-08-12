const mongoose = require('mongoose')
const employeeSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        requried: true
    },
    password:{
        type: String,
        reqruied: true
    }


},{
    timestamps:true
})
const Employee = mongoose.model('Employee',employeeSchema)
module.exports = Employee