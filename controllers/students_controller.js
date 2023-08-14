const Student = require('../models/students');
const Company = require('../models/company');
const Interview = require('../models/interview');



module.exports.studentsPage = async function(req,res){
    console.log("User: ", req.user)
    try{

        const students = await Student.find({})
        .populate('interviewList')        
        for (let student of students) {
            for (let interview of student.interviewList) {
              await Interview.populate(interview, { path: 'company' });
              await Interview.populate(interview, { path: 'student' });
            }
            console.log("Populated Student:", student);
        }
        
        res.render('students', {
            title: "Students Page",
            user: req.user,
            students:students
        })
    }
    catch(err){
        console.log("Error Fetching Students!", err)
    }
}


module.exports.createStudent = async(req,res)=>{
    try{
        const {name,email,batch,college,dsa,webd,react} = req.body;
        const student = await Student.create({
            name,
            email,
            batch,
            college,
            dsa,
            webd,
            react
        })
        console.log("Student Created Successfully!",student)
        return res.redirect('back');
    }
    catch(err){
        console.log("Error Creating Student!")
        return res.redirect('back')
    }
}

module.exports.deleteStudent = async function (req, res) {
    try {
      const id = req.params.id
      const deletedStudent = await Student.findById(id)
      
      for(let interview of deletedStudent.interviewList){
          try{
                  const deleteInterview = await Interview.findByIdAndDelete(interview._id);
                  console.log("Deleted Interview Within Student!", deletedStudent.name)
                }
                catch(err){
                    console.log("Error Deleting Interview of ", deletedStudent.name)
                }
                
            }
            const  deleteStudent= await Student.findByIdAndDelete(id)
            console.log('Successfully Deleted Student!', deleteStudent)
          
          
      return res.redirect('back')
    } catch (err) {
      console.log('Error Deleting Company!', err)
      return res.redirect('back')
    }
  }