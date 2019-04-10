var express = require("express");
var path = require("path");
var app = express();

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