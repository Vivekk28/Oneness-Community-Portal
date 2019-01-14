var express=require('express');
var path=require('path');
var router=express.Router();
var multer=require('multer');
var comm=require('../models/communitymodel');
var storage=multer.diskStorage({
    destination:'public/uploads/',
    filename: function(req,file,cb)
    {
        cb(null,req.session.user._id+"com"+path.extname(file.originalname));
    }
});

router.get('/AddCommunity',function(req,res)
{

    res.render('editor',{user:req.session.user});
});
var upload=multer(
    {
        storage: storage
    }
);
router.post('/createCommunity',upload.single('comImage'),function(req,res)
{
    console.log("Called");
    console.log(req.body);
    
    var community=new comm({
        name:req.body.commName,
        desc:req.body.desc,
        owner: req.session.user.name,
        picture:req.file.filename,
        rule:req.body.role,
       
        created_at: new Date(),
        
    });
    community.save(function(err)
{
    if(err) throw err;
})
 
console.log(req.file);
});
router.get('/viewcommunities',function(req,res)
{
    
    
comm.find({},function(err,users)
{
    if(err)
    {

    }
res.render('viewcommunities',{ user: req.session.user,list: users });
});
});
router.post('/getdata',function(req,res)
{
    comm.find({},function(err,users)
{
res.json(users);
});
router.post('/updatecommunity',function(req,res)
{
    comm.findOneAndUpdate({_id:req.body.id},{name:req.body.name},function(err,user)
{
    console.log("Community updated");
});

});
});
router.post('/getinfo',function(req,res)
{
    console.log("GETDATA CALLED");
    console.log(req.body);
comm.findOne({_id:req.body.id},function(err,user)
{
    console.log(user);
res.json(user);
});
});
module.exports=router;