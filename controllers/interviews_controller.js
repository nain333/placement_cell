const Interview = require('../models/interview')
const Company = require('../models/company');
const Student = require('../models/students');

module.exports.createInterview=async function(req,res){
    try{
        console.log("Req.Body inside interview creation:",req.body)
        const interview = await Interview.create({
            name: req.body.studentId,
            company: req.body.companyId,
            date_of_visit :req.body.date,
            result: req.body.result
        })    
        console.log("Successfully Created Interview!", interview);
        return res.redirect('back');
    }catch(err){
        console.log('Error while interview creation: ',err)
        return res.redirect('back');
    }
    
    
}

module.exports.interviewsPage=async function(req,res){
    try{
        const interviews = await Interview.find({})
        const companies = await Company.find({})
        const students = await Student.find({})

    res.render('interview',{
        title:'Interviews | Career Hub',
        user:req.user,
        interviews,
        companies,
        students
    })
    }
    catch(err){
        console.log("Error Fetching InterviewPage Details!",err);
        return res.redirect('back');
    }
}