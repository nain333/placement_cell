module.exports.signIn = function(req,res){
    res.render('sign_in',{
        title:'Employee Sign In | Career Land'
    })
}
module.exports.signUp=function(req,res){
    res.render('sign_up',{
        title:'Employee Sign Up | Career Land'
    })
}