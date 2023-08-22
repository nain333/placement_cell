// schema for reset password tokens
const mongoose = require('mongoose')
const resetTokensSchema=new mongoose.Schema({
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    accessToken:{
        type:String
    },
    isValid:{
        type:Boolean
    }
},{
    timestamps:true
})
const Reset_tokens=mongoose.model('Reset_Tokens',resetTokensSchema)
module.exports=Reset_tokens