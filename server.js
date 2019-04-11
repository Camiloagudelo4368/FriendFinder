var Serverfriends = require("./app/data/friends")
var express = require("express");
var path = require("path");
var fs = require("fs")
var app = express();
var friendsList = [];
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 8080

app.listen(PORT, error => {
    if (error) console.error(error)
    console.log("The server is listening on http://localhost:" + PORT)
})



// Request home
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
})

// Request home
app.get("/:route", function (req, res) {

    switch (req.params.route) {
        case "survey":
            // res.sendFile(path.join(__dirname, "app/routing/htmlRoutes.js"));
            res.sendFile(path.join(__dirname, "app/public/survey.html"));
            break;
        default:
            res.sendFile(path.join(__dirname, "app/public/home.html"));
            break;
    }
})

// Request home
app.get("/api/friends", function (req, res) {
    res.json(Serverfriends.friends)
})


app.post("/api/friends", function (req, res) {

    Serverfriends.friends.forEach(element => {
        friendsList.push(element);
    });

    var scoresInt = []

    req.body.scores.forEach(element =>{
        scoresInt.push(parseInt(element))
    })
    // console.log(req.body)
    var friendObject = {
        name: req.body.name,
        photo: req.body.photo,
        scores: scoresInt
    };

    friendsList.push(friendObject);

    // console.log(friendsList)
    var friendsText = `exports.friends =  ${JSON.stringify(friendsList)}`
    // console.log(friendsText)

    fs.writeFile("./app/data/friends.js", friendsText, function (error) {
        if (error) throw error;

        var ServerfriendsRead = require("./app/data/friends")


        // var matchObject = ServerfriendsRead.friends[ServerfriendsRead.friends.length - 1];
        var result = 0;
        var matchObject = {
            name: "",
            photo: "",
            scores: [],
            match: 51
        }

        ServerfriendsRead.friends.forEach(element => {


            for (let i = 0; i < element.scores.length - 1; i++) {

                var val1 = parseInt(element.scores[i]);
                var val2 = parseInt(friendObject.scores[i]);

                result += Math.abs(val1 - val2)
            }
            // console.log(friendObject.name, element.name, result, element.scores, friendObject.scores)
            if (result < matchObject.match) {
                matchObject = {
                    name: element.name,
                    photo: element.photo,
                    scores: element.scores,
                    match: result
                }
            }

            result = 0
        });

        res.json(matchObject)
    })



})