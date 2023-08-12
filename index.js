const express = require('express')
const app = express()
const passport=require('passport')
const passportLocal=require('passport-local')
const port = 9000
const expressLayouts=require('express-ejs-layouts')
const path = require('path');
const db = require('./config/mongoose.js')
const session = require('express-session')
app.set('view engine','ejs')
app.set('views', './views');

app.use(expressLayouts)

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

// Assets
app.use(express.static('./assets'));
app.use(express.urlencoded({extended:true}))
app.use('/',require('./routes'))

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in starting the server: ${err}`)
        return
    }
    console.log(`Server is running on port: ${port}`)
})