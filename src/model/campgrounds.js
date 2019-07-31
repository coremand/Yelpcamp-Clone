const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    name : {
        type : String,
    },
    image : {
        type : String,
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    description : {
        type : String,
    },
    comments : [{
        type : Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;