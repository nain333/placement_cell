const Interview = require('../models/interview')
const Company = require('../models/company')
const Student = require('../models/students')


const dateFormatter = (date)=>{
    const newDate = new Date(date)

    const options = {
      weekday: 'short', // Short weekday name (e.g., "Tue")
      month: 'short', // Short month name (e.g., "Aug")
      day: 'numeric', // Numeric day (e.g., "22")
      year: 'numeric' // Full year (e.g., "2023")
    }

    const formattedDate = newDate.toLocaleDateString('en-US', options)
    return formattedDate;
}

module.exports.createInterview = async function (req, res) {
  try {
    const newFormattedDate = dateFormatter(req.body.date);
    // console.log("Req.Body inside interview creation:",req.body)
    const interview = await Interview.create({
      student: req.body.studentId,
      company: req.body.companyId,
      date_of_visit: newFormattedDate,
      status: req.body.status
    })
    const student = await Student.findOne({ _id: req.body.studentId })
    // console.log('Student inside the interview creation ', student)
    student.interviewList.push(interview._id)
    student.save()
    // console.log('pushed Student' , student)
    // console.log("Successfully Created Interview!", interview._id);
    return res.redirect('back')
  } catch (err) {
    console.log('Error while interview creation: ', err)
    return res.redirect('back')
  }
}

module.exports.interviewsPage = async function (req, res) {
  try {
    const companies = await Company.find({})
    const students = await Student.find({})
    const interviews = await Interview.find({})
      .populate('company')
      .populate('student')

    // console.log("Interviews from Controller: ",interviews)
    res.render('interview', {
      title: 'Interviews | Career Hub',
      user: req.user,
      interviews,
      companies,
      students
    })
  } catch (err) {
    console.log('Error Fetching InterviewPage Details!', err)
    return res.redirect('back')
  }
}
module.exports.updateInterview = async function (req, res) {
  try {
      const id = req.params.id
    const newFormattedDate = dateFormatter(req.body.date);
    const updateInterview = await Interview.findByIdAndUpdate(
      { _id: id },
      { 
         status: req.body.status,
         date_of_visit: newFormattedDate,
         result: req.body.result
        }
    )
    updateInterview.save()
    console.log('interviewId: ', id)
    console.log('request body inside the updateInterview ', req.body)
    console.log('updated interiview: ', updateInterview)
    return res.redirect('back')
  } catch (err) {
    console.log('error in updating interview: ', err)
  }
}

module.exports.deleteInterview = async(req,res)=>{
    try{
        let id = req.params.id;
        let deletedInterview = await Interview.findByIdAndDelete(id);
        
        console.log("Successfully Deleted Interview!", deletedInterview);
        res.redirect('back');
    }
    catch(err){
        console.log("Error in Deleting Interview!", err);
        res.redirect('back');
    }
}
