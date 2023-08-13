const mongoose = require('mongoose')
const interviewSchema = new mongoose.Schema({

    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'  
    },
    date_of_visit:{
        type:Date,
        required:true,
        
    },
    student:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Student'
    },
    result: {
        type: String,
        enum: ["Pass", "Fail", "On Hold", "Didn't Attempt", "Registered"],
        default: "Registered"
    }
    
    


},{
    timestamps:true
})
const Interview=mongoose.model('Interview',interviewSchema)
module.exports = Interview