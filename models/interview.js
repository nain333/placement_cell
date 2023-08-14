const mongoose = require('mongoose')
const interviewSchema = new mongoose.Schema({

    student:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Student'
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'  
    },
    date_of_visit:{
        type: String,
        required:true,
    },
    status: {
        type: String,
        enum: ["Pass", "Fail", "On Hold", "Didn't Attempt", "Registered"],
        default: "Registered"
    },
    result: {
        type: String,
        enum: ["Placed", "Not Placed"],
        default: "Not Placed"
    }
    
    


},{
    timestamps:true
})
const Interview=mongoose.model('Interview',interviewSchema)
module.exports = Interview