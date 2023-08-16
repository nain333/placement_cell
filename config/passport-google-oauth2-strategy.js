const passport = require('passport')
const googleStrategy=require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const Employee = require('../models/employee')
passport.use(new googleStrategy({
    clientID:'82631915071-hu325i6j62idbe9hgqd2a19lghcl42ok.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'https://career-hub-vcus.onrender.com/employee/auth/google/callback'
},function(accessToken,refreshToken,profile,done){
        Employee.findOne({email:profile.emails[0].value}).then(function(employee){
            // if(error){
            //     console.log('error in strategy passport-google-oauth',error)
            // return
            
            // }
            console.log('profile: ',profile)
            if(employee){
                console.log('employee found in the db itself')
                return done(null, user)
            }else{
                console.log('inside the user creation using google-auth')
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