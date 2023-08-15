const express = require('express')
const app = express()
const passport=require('passport')
const passportLocal=require('passport-local')
const localStreategy=require('./config/passport-local-streategy')
const port = 9000
const expressLayouts=require('express-ejs-layouts')
const path = require('path');
const db = require('./config/mongoose.js')
const session = require('express-session')
const MongoStore = require('connect-mongo');


app.set('view engine','ejs')
app.set('views', './views');

app.use(expressLayouts)

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)
app.use(session({
    name:'placement-lesscell',
    // Todo change the secrate before deployment
    secret: 'this_is_not_a_secrate_anymore_lol_please_help_me_setting_up_coockie_njfksdljfkdjfksdajfksdjkf',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },store: MongoStore.create({
        mongoUrl: "mongodb+srv://hnain70:P9xnRimzvA2uXpJ4@cluster0.a7a8nra.mongodb.net/placement_cell_db",
        autoRemove: 'disabled'
    }),
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

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