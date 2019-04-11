var express = require("express");
var friends = require("../data/friends")

var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 8081

app.listen(PORT, error => {
    if (error) console.error(error)
    console.log("The server is listening on http://localhost:" + PORT)
})


// Request home
app.get("/api/friends", function(req, res){
    res.json(friends.friends)
})


app.post("/api/friends",  function(res,res){
    var friendObject = new friends();

    friendObject.name = res.name;
    friendObject.photo = res.photo;
    friendObject.scores = res.scores;

    friends.push(friendObject);

    return friends
})