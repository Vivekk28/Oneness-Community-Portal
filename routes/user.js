var express=require('express');
var router=express.Router();
var User = require('../models/loginmodel');

router.get('/',function(req,res)
{ 
    res.status(200);
   if(!req.session.user.isregistered)
   res.render('register',{user:req.session.user});
   else
   res.render('user',{user:req.session.user});
//res.send('Welcome to admin');
});
router.post('/edituser',function(req,res)
{ var a=req.session.user.email;
    User.findOneAndUpdate({ email:a }, { dob:req.body.dob,gender:req.body.gender,name:req.body.fullname,city:req.body.city,phone:req.body.phone,isregistered:true}, function(err, user) {
        if (err) throw err;
      
        // we have the updated user returned to us
    
        //res.render('user',{user:req.session.user});
      });
      User.findOne({email:a},function(err,user)
    {
       if(user)
       {
           req.session.user=user;
           res.redirect('/');
       }
    });
      
 
});
module.exports=router;