const express = require("express");
const hbs = require("hbs");
let bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));

const campgrounds = [
    {name:"Salmon Creek", image:"https://pixabay.com/get/5fe8d1434852b108f5d084609620367d1c3ed9e04e50744f772f7bd19645c2_340.jpg"},
    {name:"Granite Hill", image:"https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c732d7bd4924ccd5f_340.jpg"},
    {name:"Mountain Goat Rest", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f772f7bd19645c2_340.jpg"},
    {name:"Mesa Rest Area", image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d7bd19749cd59_340.jpg"}
]

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/campgrounds", (req,res) => {
   
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", (req,res) => {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});








app.listen(3000, () => {
    console.log("SERVER HAS STARTED");
});