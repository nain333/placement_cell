const Student = require('../models/students');


module.exports.studentsPage = async function(req,res){
    console.log("User: ", req.user)
    try{

        const students = await Student.find({})
        console.log("fetched Students: ", students)
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