const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../model/campgrounds");
const Comment = require("../model/comment");



//Comment new
router.get("/new",isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (error, campground) => {
        if(error) {
            console.log(error);
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
    
});

//create comment
router.post("/", isLoggedIn, (req, res) => {
    //lookup campground using ID:
    Campground.findById(req.params.id, (error, campground) => {
        if(error) {
            console.log(error);
            res.redirect("/campgrounds")
        } else {
            //create new comment
              Comment.create(req.body.comment, function (error, comment) {
                  if(error){
                    console.log(error);
                  } else {
                      //add username and id to comment
                      comment.author.id = req.user._id;
                      comment.author.username = req.user.username;
                      //save comment
                      comment.save();
                      campground.comments.push(comment);
                      campground.save();
                      res.redirect("/campgrounds/" + campground._id);
                  }
              })
        }
    })
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login");
}


module.exports = router;