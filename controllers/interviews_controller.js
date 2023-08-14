const Interview = require('../models/interview')
const Company = require('../models/company');
const Student = require('../models/students');

module.exports.createInterview=async function(req,res){
    try{
const date = new Date(req.body.date);

const options = {
  weekday: 'short', // Short weekday name (e.g., "Tue")
  month: 'short',   // Short month name (e.g., "Aug")
  day: 'numeric',   // Numeric day (e.g., "22")
  year: 'numeric'   // Full year (e.g., "2023")
};

const formattedDate = date.toLocaleDateString('en-US', options);
console.log(formattedDate);

        // console.log("Req.Body inside interview creation:",req.body)
        const interview = await Interview.create({
            student: req.body.studentId,
            company: req.body.companyId,
            date_of_visit :formattedDate,
            status: req.body.status,
        })
        const student = await Student.findOne({_id:req.body.studentId})
        console.log('Student inside the interview creation ', student)
        student.interviewList.push(interview._id)
        student.save();
        console.log('pushed Student' , student)    
        console.log("Successfully Created Interview!", interview._id);
        return res.redirect('back');
    }catch(err){
        console.log('Error while interview creation: ',err)
        return res.redirect('back');
    }
    
    
}

module.exports.interviewsPage=async function(req,res){
    try{
        const companies = await Company.find({})
        const students = await Student.find({})
        const interviews = await Interview.find({})
        .populate('company')
        .populate('student')

        console.log("Populated Interview: ",interviews)
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