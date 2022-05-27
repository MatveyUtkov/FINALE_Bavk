const MovieModule=require("../models/MovieModel");
exports.findAll = async (req, res) => {
    try {
        const user = await MovieModule.find();
        console.log(user);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};