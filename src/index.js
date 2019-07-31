const express = require("express");
require("./db/mongoose");
const app = express();
const hbs = require("hbs");
let bodyParser = require('body-parser');
const Campground = require("./model/campgrounds");
const Comment = require("./model/comment");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const session = require("express-session");
const User = require("./model/user");
const seedDB = require("../seeds");
const path = require('path');
var methodOverride = require('method-override')


//require routes
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");


//Handlebar Setup
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));
app.set('view engine', 'hbs');
app.set("views", viewsPath);
app.use(methodOverride("_method"));
//Handlebar Helper

//PASSPORT SETUP
app.use(session({
    secret: "Learningon",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
 });

//Appends campground to every campground route
 app.use("/campgrounds", campgroundRoutes);
 //Appends comments route
 app.use("/campgrounds/:id/comments", commentRoutes);
 app.use(indexRoutes);




app.listen(3000, () => {
    console.log("SERVER HAS STARTED");
});