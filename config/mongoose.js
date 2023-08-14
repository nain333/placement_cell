const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://developerashis99:gSlbbzdGZMlhuLRb@cluster0.3m2ngtn.mongodb.net/Placement-Cell_Dev')
// extract the connection
const db = mongoose.connection
db.on('error',console.error.bind(console,"Error in connecting to the db"))
db.once('open',()=>{
    console.log("successfuly connected :: mongoDB")
})
module.exports=db