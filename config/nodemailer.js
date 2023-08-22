require('dotenv').config()
const nodemailer= require('nodemailer')
const ejs = require('ejs')
const path = require('path')
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.mailingUser,
        pass:process.env.mailingPassword
    }
})
let renderTamplet=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error: in rendering mailing tamplet',err)
                return
            }
            mailHTML=template;

        }
    )
    return mailHTML
}
module.exports ={
    transporter: transporter,
    renderTamplet:renderTamplet
}