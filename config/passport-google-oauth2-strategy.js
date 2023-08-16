const passport = require('passport')
const googleStrategy=require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const Employee = require('../models/employee')
passport.use(new googleStrategy({
    clientID:'82631915071-u2atp1h3lrtjausjpvrae63m44tu3oie.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'/employee/auth/google/callback'
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