module.exports.home=function(req,res){
    res.render('home',{
        title:'Home',
        employee:req.user
    })
}