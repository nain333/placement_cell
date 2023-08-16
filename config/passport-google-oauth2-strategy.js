const passport = require('passport')
const googleStrategy=require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const Employee = require('../models/employee')

const googleClientId = process.env.googleClientId;
const googleClientSecret = process.env.googleClientSecret
const googleCallbackUrl = process.env.googleCallbackUrl


passport.use(new googleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackUrl
},function(accessToken,refreshToken,profile,done){
        Employee.findOne({email:profile.emails[0].value}).then(function(employee){
            console.log('profile: ',profile)
            if(employee){
                console.log('employee found in the db itself')
                return done(null, employee)
            }else{
                console.log('inside the employee creation using google-auth')
                Employee.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                }).then(function(employee){
                    console.log('employee created successfuly: ',employee)
                    return done(null,employee)

                }).catch(function(error){
                    console.log("Error in creating employee using passport-google-oauth-stategy")
                    return

                })
            }


        }).catch((error)=>{
            console.log('Error in signing up with google-strategy: ',error )
        })

}
))
module.exports=passport