const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    movie_name:String,
    movie_rate:String
});
let userModel = new mongoose.model("Movie", userSchema);
module.exports = userModel;