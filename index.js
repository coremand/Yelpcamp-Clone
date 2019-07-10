const express = require("express");
require("./Yelp-manager/src/db/mongoose");
const hbs = require("hbs");
let bodyParser = require('body-parser');
const Campground = require("./Yelp-manager/src/model/images");

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/campgrounds", (req,res) => {
    //Get all campgrounds from database:
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds",{campgrounds: allCampgrounds});
        }
    })
   
    
});

app.post("/campgrounds", (req,res) => {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description : desc}
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

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

//Show more information about one campground:

app.get("/campgrounds/:id", (req, res) => {
    //find campground with provided id
    Campground.findById(req.params.id, (error, foundCampground) => {
        if(error){
            console.log(error)
        } else {
            //render show template with that campground:
            res.render("show", {campground : foundCampground});
        }
    })
    
    
});










app.listen(3000, () => {
    console.log("SERVER HAS STARTED");
});