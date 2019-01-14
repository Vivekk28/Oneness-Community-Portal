var express=require('express');
var port=8000;
var app=express();
var pages=require('./routes/page.js');
var admin=require('./routes/admin.js');
var user=require('./routes/user.js');
var community=require('./routes/community.js');
var path=require('path');
var bodyParser = require('body-parser')
var session=require('express-session');
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var multer=require('multer');
mongoose.connect('mongodb://localhost/MyDatabase');



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');



app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(session({secret: 'falsjfnsjal',cookie: {maxage: 60000,secure:false}}))
app.use(express.static(__dirname + '/views'));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use('/user',user);
app.use('/admin',admin);
app.use('/community',community);
app.use('/',pages);
app.use('/test',function(req,res)
{

    res.render('test',{user: "viveksehgal"});
});

app.listen(port);
module.exports=app;