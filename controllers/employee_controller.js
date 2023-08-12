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

module.exports.create = (req,res)=>{
    Employee.create({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password 
    })
    .then((employee)=>{
        console.log("Account Created Successfully!", employee)
        retirres.redirect('/employee/sign-in')
    })
    .catch((err)=>{
        console.log("Error Creating User!", err)
        res.redirect('back');
    })
}
