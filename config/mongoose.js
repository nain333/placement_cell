const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/placement_cell_dev_db')
// extract the connection
const db = mongoose.connection
db.on('error',console.error.bind(console,"Error in connecting to the db"))
db.once('open',()=>{
    console.log("successfuly connected :: mongoDB")
})
module.exports=db