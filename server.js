const express =  require('express');
const colors = require('colors');
const mongoose = require('mongoose');
const flash = require("connect-flash");
var bodyParser  = require('body-parser'); 
const session = require("express-session");

const app=express();

const dotenv = require('dotenv');
dotenv.config({
    path:'./config/.env',
});


mongoose.connect("mongodb://localhost/Orientation",{
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;

db.once("open",function(){
    console.log("Connected to MongoDB".cyan.bold);
});

//check for db errors
db.on("error", function (err) {
    console.log(err);
});


app.use(express.urlencoded({ extended: true }));

app.use(express.json({}));
app.use(
    express.json({
        extended: true,
    })
);

app.use(
    session({
        name: "Orientation",
        secret: "J3$dXnNh8cKe<jHkKXX!pH*>Lr!#@C:_;e??(eM(g.p22`At*u",
        resave: true,
        saveUninitialized: true, //should be false if we want to avoid logging in again
        maxAge: 24 * 60 * 60 * 1000 * 10,
    })
);

app.use(flash());
app.use((req, res, next) => {
    res.locals.success_message = req.flash("success_message");
    res.locals.error_message = req.flash("error_message");
    next();
});

app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
app.use("/", require("./routes/index"));


const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server running on :${PORT}`.green.underline.bold);
});

