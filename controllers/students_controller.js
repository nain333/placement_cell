const Student = require('../models/students');


module.exports.studentsPage = async function(req,res){
    console.log("User: ", req.user)
    try{
        res.render('students', {
            title: "Students Page",
            user: req.user
        })
    }
    catch(err){
        console.log("Error Fetching Students!", err)
    }
}