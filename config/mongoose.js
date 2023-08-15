const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hnain70:P9xnRimzvA2uXpJ4@cluster0.a7a8nra.mongodb.net/placement_cell_db')
// extract the connection
const db = mongoose.connection
db.on('error',console.error.bind(console,"Error in connecting to the db"))
db.once('open',()=>{
    console.log("successfuly connected :: mongoDB")
})
module.exports=db