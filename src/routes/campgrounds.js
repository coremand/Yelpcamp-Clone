const express = require("express");
const router = express.Router();
const Campground = require("../model/campgrounds");



//Shows all campgrounds
router.get("/", (req,res) => {
    //Get all campgrounds from database:
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds",{campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
   
    
});
//Create; adding new campgrounds
router.post("/", isLoggedIn, (req,res) => {
    //get data from form and add to campground array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = {name: name, image: image, description : desc, author: author}
    //CREATE NEW CAMPGROUND AND SAVE TO DATABASE:
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log(err)
        } else {
            //redirect back to campground page
            res.redirect("/campgrounds");
        }
    })
});

//NEW-Show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
    res.render("new");
});

//Show more information about one campground:

router.get("/:id", (req, res) => {
    //find campground with provided id and display comment:
    Campground.findById(req.params.id).populate("comments").exec((error, foundCampground) => {
        if(error){
            console.log(error)
        } else {
            //render show template with that campground:
            res.render("show", {campground : foundCampground});
        }
    })
    
    
});

//Edit route:
//shows the edit form
router.get("/:id/edit", checkCampgroundOwnership, (req, res)=> {
    Campground.findById(req.params.id, function(error, foundCampground){
        res.render("edit", {campground: foundCampground})
    });
});

//handles update logic
// UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

//Delete/Destroy route
router.delete("/:id", checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndDelete(req.params.id, (error)=>{
        if(error){
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    });
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(error, foundCampground){
            if(error){
                res.redirect("back")
            } else {
                //does the user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next()
                } else {
                    res.redirect("back");
                }
                
            }
        });
    } else {
        res.redirect("back")
    }
}


module.exports = router;