const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../model/user");




//ROOT ROUTE
router.get("/", (req, res) => {
    res.render("index");
});

//show register form
router.get("/register", (req, res)=> {
    res.render("register");
})

//handle register logic

router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (error, user)=>{
        if(error){
            console.log(error)
           return res.render("register")
        }
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/campgrounds");
        })
    })
})

//show login form
router.get("/login", (req, res) =>{
    res.render("login")
})
//handling login logic
router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}), (req, res)=>{
    
})

//logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds")
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login");
}


module.exports = router;