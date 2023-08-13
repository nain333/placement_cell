const mongoose = require('mongoose')
const companySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    interviewList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    }]
},{
    timestamps:true
})
const Company = mongoose.model('Company',companySchema)
module.exports=Company;