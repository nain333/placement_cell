const Student = require('../models/students')
const Company = require('../models/company')
const Interview = require('../models/interview')

module.exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      name: req.body.name
    })
    return res.redirect('back')
  } catch (err) {
    console.log('Error in creating company:', err)
  }
}

module.exports.companyPage = async (req, res) => {
  try {
    const companies = await Company.find({}).populate('interviewList')
    for (let company of companies) {
      for (let interview of company.interviewList) {
        await Interview.populate(interview, { path: 'company' })
        await Interview.populate(interview, { path: 'student' })
      }
    }
    return res.render('company', {
      title: 'Companies',
      user: req.user,
      companies: companies
    })
  } catch (err) {
    console.log('Error Fetching Companies!', err)
    return res.redirect('back')
  }
}

module.exports.deleteCompany = async function (req, res) {
  try {
    const id = req.params.id
    const deletedCompany = await Company.findById(id)
    console.log('Successfully Deleted Company!', deletedCompany)

        for(let interview of deletedCompany.interviewList){
            try{
                const deleteInterview = await Interview.findByIdAndDelete(interview._id);
                console.log("Deleted Interview Within Company!", deletedCompany.name)
            }
            catch(err){
                console.log("Error Deleting Interview of ", deletedCompany.name)
            }

        }
        const  deleteCompany= await Company.findByIdAndDelete(id)
        
        
    return res.redirect('back')
  } catch (err) {
    console.log('Error Deleting Company!', err)
    return res.redirect('back')
  }
}
