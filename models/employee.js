const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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

// pre model function to be called before saving password new / modified by user 
employeeSchema.pre('save',async function(next){
    console.log('pre insdie user Model is called')

    if(this.isModified('password')||this.isNew){

        const hash = await bcrypt.hash(this.password,13)
        console.log("hashed password is: ", hash)
        this.password=hash

    }
    next()

})
const Employee = mongoose.model('Employee',employeeSchema)

module.exports = Employee