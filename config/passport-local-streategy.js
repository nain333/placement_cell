const passport = require('passport')
const LocalStrategy= require('passport-local').Strategy
const Employee = require('../models/employee')
passport.use(new LocalStrategy(
    {
        usernameField:'email',
        passReqToCallback:true
    },

    async function(req,email, password, done){
        try{
        const employee = await Employee.findOne({email:email})
        if(!employee||employee.password!=password){
            console.log("Invalid credentials")
            
            return done(null,false)

        }
        return done(null,employee)
        

    }catch(error){
        console.log("Error in  finding User ---->> passport")
        return done(error)
    }
}


))
// serialize the emoploye to descide which key is to be kept in cookies

passport.serializeUser((employee,done)=>{
    console.log('Seriallized Employee')
    console.log("Serializing user with id:..." ,employee.id)
    return done(null,employee.id)

})

passport.deserializeUser(async (id, done) => {
    try {
        const employee = await Employee.findById(id);
        if (employee) {
            return done(null, employee);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.log('Error in deserializing Employee:', error);
        return done(error);
    }
});


// check if the employee is authenticated
passport.checkAuthentication=(req,res,next)=>{
    // if the employee is signed in pass the req to the next middleware
    if(req.isAuthenticated()){
        return next()

    }
    return res.redirect('/employee/sign-in')

}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.employee= req.user; 
        // console.log('employee in setAuthenticated User:', req.user)
        // console.log('Set authenticated User');
        // console.log(res.locals)
    }
    next();
};
module.exports= passport


