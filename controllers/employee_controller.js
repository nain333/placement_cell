const Employee = require('../models/employee')

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        req.flash('success', 'Signed In Successfully!');
        return res.redirect('/students');
    }
    res.render('sign_in',{
        title:'Employee Sign In | CareerHub'
    })
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/students');
    }
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

// Creating Session
module.exports.createSession = (req, res) => {
    console.log("Logged in Successfully");
    req.flash('success', 'Signed In Successfully!');
    return res.redirect("/students");
  };

// Destry Session
module.exports.destroySession = (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log("Error in Log Out!");
        return;
      }
      console.log("Successfully logged out!");
      return res.redirect("/");
    });
};
module.exports.updateInterview=async function (req,res){
    console.log('req.body inside the updateINterview',req.body)


}
module.exports.forgotPassword=async function(req,res){
    res.render('forgot_password',{
        title:'Forgot Password | Career Hub'
    })
}


