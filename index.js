const express = require('express')
const app = express()
const db = require('./config/mongoose.js')

require('dotenv').config()

const passport=require('passport')
const passportLocal=require('passport-local')
const localStreategy=require('./config/passport-local-streategy')
const googlePassport=require('./config/passport-google-oauth2-strategy')
const port = 9000

const expressLayouts=require('express-ejs-layouts')
const path = require('path');

const session = require('express-session')
const MongoStore = require('connect-mongo');
const customMware=require('./config/middleware')
const flash = require('connect-flash')

app.set('view engine','ejs')
app.set('views', './views');

app.use(expressLayouts)

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)
app.use(session({
    name:'placement-lesscell',
    // Todo change the secrate before deployment
    secret: process.env.sessionSecret,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },store: MongoStore.create({
        mongoUrl: process.env.mongodbUrl,
        autoRemove: 'disabled'
    }),
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Assets
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(customMware.setFlash)

app.use('/',require('./routes'))

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in starting the server: ${err}`)
        return
    }
    console.log(`Server is running on port: ${port}`)
})