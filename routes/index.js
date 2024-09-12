const express = require('express');
const router = express.Router();
var bodyParser  = require('body-parser'); 
const path = require('path');



var app = express();
app.use(bodyParser.urlencoded({extended: true}));

const Schedule = require('../models/schedule');
const Blist = require('../models/batchlist');


router.get('/',(req,res)=>{

    res.render('signin');
    // let sch = await Blist.find();
    // console.log(sch);
});

router.get('/signinname',(req,res)=>{
    res.render('signinname');
});




router.post('/signin',async(req,res)=>{
    const reg=req.body.regno;
    var user = await Blist.findOne({rollno:reg});
    if (user) {
        req.flash("success_message", "Login Successfully");
        const batchno=user.batch;

        const date = new Date();
        // for current date
        // let day = date.getDate(); 
        let day=27;

        const mp={27:"0",28:"1",29:"2",31:"3",1:"4",2:"5",3:"6",4:"7",5:"8"};
        var dayno=mp[day];
        let sch=await Schedule.find({batch:batchno,dayno:dayno});

        // console.log(sch);

        
        // let hour = date.getHours();
        // let min = date.getMinutes();
        var currtime="9:35".split(":");
        var currsec=parseInt(currtime[0] * 3600 + currtime[1] * 60);

        res.render('profile',{sch,currsec,user});
    }
    else{
        req.flash("error_message", "User Not exist");
        res.redirect("/");
    }
    

});


router.post('/signinname',async(req,res)=>{
    var na=req.body.name.toUpperCase();
    console.log(na);
    var user = await Blist.findOne({name:na});
    if (user) {
        req.flash("success_message", "Login Successfully");
        console.log(user);
        var batchno=user.batch;

        var date = new Date();
        // for current date
        // let day = date.getDate(); 
        let day=27;

        const mp={27:"0",28:"1",29:"2",31:"3",1:"4",2:"5",3:"6",4:"7",5:"8"};
        var dayno=mp[day];
        let sch=await Schedule.find({batch:batchno,dayno:dayno});

        // console.log(sch);

        
        // let hour = date.getHours();
        // let min = date.getMinutes();
        let currtime="9:35".split(":");
        var currsec=parseInt(currtime[0] * 3600 + currtime[1] * 60);

        res.render('profile',{sch,currsec,user});
    }
    else{
        req.flash("error_message", "User Not exist");
        res.redirect("/");
    }
        

});


router.get('/detbydate',(req,res)=>{
    res.render('search');
});


router.post('/search',async(req,res)=>{
    const dayno=req.body.date;
    const batchno=req.body.batchno;
    let sch=await Schedule.find({batch:batchno,dayno:dayno});
    console.log(sch);
    res.render('details',{sch});

});



module.exports=router;