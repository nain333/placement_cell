const Employee = require('../models/employee')

module.exports.signIn = function(req,res){
    res.render('sign_in',{
        title:'Employee Sign In | CareerHub'
    })
}
module.exports.signUp=function(req,res){
    res.render('sign_up',{
        title:'Employee Sign Up | CareerHub'
    })
} 
// Creating Emplyee
module.exports.create = async(req,res)=>{
    try {
        const employee = await Employee.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    
        console.log("Account Created Successfully!", employee);
        return res.redirect('/employee/sign-in');
    } catch (err) {
        console.log("Error Creating User!", err);
        return res.redirect('back');
    }
}


