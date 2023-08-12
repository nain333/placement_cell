const express = require('express')
const app = express()
const port = 9000
const db = require('./config/mongoose.js')
app.set('view engine','ejs')
app.use('/',require('./routes'))
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in starting the server: ${err}`)
        return
    }
    console.log(`Server is running on port: ${port}`)
})