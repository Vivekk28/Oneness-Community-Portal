var express=require('express');
var router=express.Router();
var User = require('../models/loginmodel');
datatablesQuery = require('datatables-query');
        
function redirectLogin(req,res)
{
    if(!req.session.log)
    res.redirect('/')

}

router.get('/',function(req,res)
{ 
    redirectLogin(req,res);
    res.status(200);
 
    res.render('admin',{user: req.session.user });
//res.send('Welcome to admin');
});
router.get('/logout',function(req,res)
{
    redirectLogin(req,res);
    req.session.destroy();
    res.redirect('/');
});
router.get('/adduser',function(req,res)
{
     redirectLogin(req,res);
    console.log('adduser');
    res.render('adduser',{user: req.session.user});

});
router.post('/useradded',function(req,res)
{
    redirectLogin(req,res);
    console.log(req.body.role);
    
    var test = new User({
        email:req.body.email,
        password:req.body.pass,
        phone: req.body.phone,
        city:req.body.city,
        role: req.body.role,
        isregistered: false,
        status:"Pending",
        activated:false

     
    });
    test.save(function(err)
{
});
res.redirect('/admin')
});
router.post('/getdata',function(req,res)
{
    User.find({},function(err,users)
{
res.json(users);
});

});
router.get('/viewusers',function(req,res)
{
    redirectLogin(req,res);
    
User.find({},function(err,users)
{
    if(err)
    {

    }
res.render('viewusers',{ user: req.session.user,list: users });
});
});
router.post('/checkusers',function(req,res)
{
    redirectLogin(req,res);
   

User.find({ email: req.body.email },function(err,data)
{
    //console.log(data);
if(data.length!=0)
res.send("true");
else
res.send("false");

});

});
router.post('/updateuser',function(req,res)
{
    
    User.findOneAndUpdate({ email:req.body.oldemail }, { email: req.body.email,city:req.body.city,phone:req.body.phone,role:req.body.role,status:req.body.status}, function(err, user) {
        if (err) throw err;
      
        // we have the updated user returned to us
        console.log("User updated");
      });
});
router.post('/edituser',function(req,res)
{ var a=req.session.user.email;
    console.log("edituser called");
    User.findOneAndUpdate({ email:a }, { dob:req.body.dob,gender:req.body.gender,name:req.body.fullname,city:req.body.city,phone:req.body.phone,isregistered:true}, function(err, user) {
        if (err) throw err;
      
        // we have the updated user returned to us
    
        //res.render('user',{user:req.session.user});
      });
      User.findOne({email:a},function(err,user)
    {
       if(user)
       {
           console.log(user);
           req.session.user=user;
           res.redirect('/admin');
       }
    });
      
 
});


module.exports=router;