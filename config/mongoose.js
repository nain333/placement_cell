const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.mongodbUrl)
// extract the connection
const db = mongoose.connection
db.on('error',console.error.bind(console,"Error in connecting to the db"))
db.once('open',()=>{
    console.log("successfuly connected :: mongoDB")
})
module.exports=db