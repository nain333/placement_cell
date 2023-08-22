const nodeMailer= require('../config/nodemailer')
// mailer function for password reset emails takes in the token as input 
exports.resetPasswordToken=(resetToken)=>{

    console.log('Token inside resetPassword Mailer', resetToken)
    let htmlString=nodeMailer.renderTamplet({         token:resetToken
    },'reset_password/reset_password.ejs')
    console.log('before template being rendered')
    console.log('employee email:',resetToken[1].employee)
    
    console.log('tamplet randered successfully')
    
    
    nodeMailer.transporter.sendMail({
        from:'admin@codial.com',
        to: resetToken[1].employee.email,
        subject:"Password Reset Requested!",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('error in sending mail: ',err)
            return
        }
        console.log('Mail sent successfully ',info)
        return

    })
    console.log('nodeMailer is working')

}