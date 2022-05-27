const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    game_name:String,
    game_image:String
});
let userModel = new mongoose.model("Post", userSchema);
module.exports = userModel;