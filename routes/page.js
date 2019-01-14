var express=require('express');
var bodyparser=require('body-parser');
var router=express.Router();
var multer=require('multer');
var User = require('../models/loginmodel');
var path=require('path');
var storage=multer.diskStorage({
    destination:'public/uploads/',
    filename: function(req,file,cb)
    {
        cb(null,req.session.user._id+path.extname(file.originalname));
    }
});
var upload=multer(
    {
        storage: storage
    }
);

function redirectLogin(req,res)
{
    if(!req.session.log)
    res.redirect('/')
    else
    {
        if(req.session.user.role=="User")
        res.redirect('/user');
        else
        res.redirect('/admin');
    }

}

router.get('/',function(req,res)
{ 

    
   res.status(200);
    res.render('index');
  
});
router.post('/',function(req,res)
{
    
var n= req.body.email;
//console.log(req.body);
console.log(req.body);
User.findOne({ email:n,password:req.body.pass },function(err, user) {
    if (err) {
       
         throw err;
    }
    if(user){
        console.log(user);
    req.session.log=true;
    req.session.user=user;
    if(user.role=="Admin")
    res.redirect('/admin');
    else if(user.role=="User"||user.role=="Community Manager")
    res.redirect('/user');
    
    }
    else res.redirect('/');
});
});
router.get('/logout',function(req,res)
{
    
    req.session.destroy();
    res.redirect('/');
});
router.post('/uploads',upload.single('myImage'),function(req,res)
{
   
    console.log("upload called");
    
});


module.exports=router;