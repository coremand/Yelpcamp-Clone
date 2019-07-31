const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username : {
        type: String
    },
    password: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);



module.exports = User;