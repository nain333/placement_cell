const Employee = require('../models/employee')
const passwordResetMailer=require('../mailers/reset_password_mailer.js')
const Reset_Tokens=require('../models/reset_pass_tokens.js')
const crypto = require('crypto')

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
        req.flash('success','Signed up Successfuly!')
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
      req.flash('success','Logged out successfuly!')
      return res.redirect("/");
    });
};
module.exports.updateInterview=async function (req,res){
    console.log('req.body inside the updateINterview',req.body)


}
module.exports.forgotPassword=function(req,res){
    res.render('forgot_password',
    {
        title:'Account Recovery || Authenticator'
    })
}
// send password recovery mail if the recovery email is valid
module.exports.resetPassword=async function(req,res){
    try{
        console.log('reached inside the resetPassword')
    let employee= await Employee.findOne({email:req.body.reset_mail})
    if(employee){
        console.log('creating Token')
    let Token = await Reset_Tokens.create(console.log('hi'),{
        employee:employee,
    
        accessToken:crypto.randomBytes(100).toString('hex'),
    
        isValid:true
    },console.log('Hello'))
     console.log('your passResetToken is ',Token)
       passwordResetMailer.resetPasswordToken(Token)
    // let job = queue.create('resetemail',Token).save(function(err){
    //     if(err){
    //         console.log('Error in creating qeue for  reset_password_mailer ',err)
    //     }
    //     console.log(job.id)
    // })
    
    console.log('employee: ', employee)

    }
    return res.render('account_recovery',{
        title:'Account Recovry || Codial',
        resetUser:employee,
        resetMail:req.body.reset_mail
        
    })

 }
 catch{
    (err)=>{
        console.log(err)
    }
}
}

// ask a new password when the link with token is clicked inside the mail sent

module.exports.askNewPassword=async function(req,res){
    // try{
    // var resetToken =  await Reset_Tokens.findOne({accessToken:req.params.accessToken})
    // console.log('findOne result: ',resetToken)
    // console.log('token in url:',req.params.accessToken.toString())
    // console.log('token inside ask password: ',token)
    // return res.render('create_new_password',{
    //     token:resetToken,
    //     title:'Create new Password'
        
    // })
    // }
    // catch{
    //     console.log('Error in finding User')
    // }

    
    Reset_Tokens.findOne({
        accessToken:req.params.accessToken.toString()
        
    }).then((token)=>{
        console.log('token inside url :',req.params.accessToken)
        console.log('Token inside the findOne: ',token)
        return res.render('create_new_password',{
            title:'Create a new password | Authenticator',
            token:token

        })


    })
    

}
// set the new passwprd if matches confirm password and save it to db in hashed format
module.exports.setNewPassword=async function(req, res){
    try{
        console.log('inside the setNewPassword')
    let token = await Reset_Tokens.findOne({accessToken:req.params.accessToken}).populate('employee')
    console.log('Token inside setNewPassword:',token)
    if(token.isValid){
        console.log('Token is valid')
        console.log('Token employee : ',token.employee.password)
        if(req.body.new_password!=req.body.confirm_new_password){
            return res.send('<h1>Password and confirm Passwords dont match, please try again<h1>')
        }
        else{
            console.log('user_id of updation: ',token.employee._id," confirm passsword ",req.body.confirm_new_password)
            let findPassword=await Employee.findOne({
                _id:token.employee._id


            })
            findPassword.password=req.body.confirm_new_password;
            await findPassword.save()
            
            console.log('Password set successfully')
            let setFalse=await Reset_Tokens.findOneAndUpdate({accessToken:req.params.accessToken},{isValid:false}) 
            }
            // return res.redirect('/users/reset-password/successfully')
            // return res.send(
            //     '<h1> password set successfully</h1> <a href="/users/sign-in">return to login</a>'
                
            //     )
            req.flash('success','password Reset Successfuly')
            res.redirect('back')
        }else{
            // res.send('Your access token expired plese request for password change again!')
            req.flash('error','your Token has expired')
            res.redirect('back')
        }
    }catch(err){
        console.log('Error while update the password', err)
    }

}

