const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const request=require('request');
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const UserRoute = require('./routes/UserRoute')
app.use('/',UserRoute)
app.set('view engine', 'ejs')
app.use(express.static('public'))
const dbConfig = require('./config/database.config.js');
const https = require("https");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
app.get("/", function(req, res){
    res.render("register");
});
app.get("/login", function(req, res){
    res.render("login");
});
app.get("/register", function(req, res){
    res.render("register");
});
app.get("/home", function(req, res){
    res.render("home");
});
app.get("/cinema", function(req, res){
    res.render("cinema");
});
app.get("/games", function(req, res){
    res.render("games");
});
app.get("/music", function(req, res){
    res.render("music");
});

app.post('/games',(req, res) => {
    let crypto = req.body.crypto
    const options = {
        method: 'GET',
        url: 'https://steam2.p.rapidapi.com/search/' + crypto + '/page/1',
        headers: {
            'X-RapidAPI-Host': 'steam2.p.rapidapi.com',
            'X-RapidAPI-Key': 'ff03032b4emsh64468f3e989e341p1c6ca8jsnb0673548dd37',
            useQueryString: true
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let json=JSON.parse(body)
        let game1=json[0].title;
        let image1=json[0].imgUrl;
        var audioUrl = '"'+ image1+  '"';
        let game2=json[1].title;
        let image2=json[1].imgUrl;
        let game3=json[2].title;
        let image3=json[2].imgUrl;
        let game4=json[3].title;
        let image4=json[3].imgUrl;
        res.send("First game is "+game1+"; Second game is "+game2+"; Third game is "+game3+"; And fourth game is "+game4)
    });

});
app.post('/cinema',(req, res) => {
        let cinemaG=req.body.crypto;
        let api="3555a76b4788127f37bff3ab69d8bf00"
        let url="https://api.themoviedb.org/3/discover/movie?api_key="+api+"&with_genres="+cinemaG+"&units=metric&mode=json"
        https.get(url,(response)=>{
            response.on('data', (d) => {
                let json=JSON.parse(d)
                let rate=json.results[0].original_title
                var score=json.results[0].vote_average
                let rate1=json.results[1].original_title
                var score1=json.results[1].vote_average
                let rate2=json.results[2].original_title
                var score2=json.results[2].vote_average
                let rate3=json.results[3].original_title
                var score3=json.results[3].vote_average
                res.send("First movie is "+rate+"with score "+score+"; Second gmovie is "+rate1+"with score "+score1+"; Third movie is "+rate2+"with score "+score2+"; And fourth movie is "+rate3+"with score "+score3)
            });
        })
    }
);
app.post('/music', (req, res) => {
    let musice=req.body.currency;
    const options1 = {

        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
            q: musice,
            type: 'multi',
            offset: '0',
            limit: '10',
            numberOfTopResults: '5'
        },
        headers: {
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
            'X-RapidAPI-Key': 'ff03032b4emsh64468f3e989e341p1c6ca8jsnb0673548dd3'
        }
    };

    axios.request(options1).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
    request(options1, function (error, response, body) {
        if (error) throw new Error(error);
        let json = JSON.parse(body)
        console.log(json);
        let music1 = json.playlists.items[0].name;
        console.log(music1);
        res.send("First game is " + music1)
    });
});
let port = process.env.PORT||3000;

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});