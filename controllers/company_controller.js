const Company = require('../models/company');

module.exports.createCompany = async(req,res)=>{
    try{
    const company = await Company.create({
        name: req.body.name
    })
    return res.redirect('back');
    }catch(err){
        console.log('Error in creating company:', err)
    }
}

module.exports.companyPage = async(req,res)=>{
    try{
        const companies = await Company.find({})
        return res.render('company',{
        title: "Companies",
        user: req.user,
        companies:companies
    });
    }
    catch(err){
        console.log("Error Fetching Companies!", err)
    }
}