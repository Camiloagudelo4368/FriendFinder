var Serverfriends = require("../data/friends")
var fs = require("fs")

var routes = {

    apiRoutes: function (app) {

        app.get("/api/friends", function (req, res) {
            res.json(Serverfriends.friends)
        })

        app.post("/api/friends", function (req, res) {

            // Goes through the new element to parse the scores to INT
            var scoresInt = []

            req.body.scores.forEach(element => {
                scoresInt.push(parseInt(element))
            })

            // Insert the scores formated intoa new element
            var friendObject = {
                name: req.body.name,
                photo: req.body.photo,
                scores: scoresInt
            };

            // Inserts New element into friends array
            Serverfriends.friends.push(friendObject)


            // Write information into friends.js file
            var friendsText = `exports.friends =  ${JSON.stringify(Serverfriends.friends)}`

            fs.writeFile("./app/data/friends.js", friendsText, function (error) {
                if (error) throw error;


                var result = 0;
                // Inicilalize object with the maximum score possible + 1 to compare later
                // are 10 questions and the max diff on each question could be 4
                var matchObject = {
                    name: "",
                    photo: "",
                    scores: [],
                    match: 41
                }

                // Evaluate the friends array from the begining to length - 1
                Serverfriends.friends.slice(0, -1).forEach(element => {

                    for (let i = 0; i < element.scores.length; i++) {

                        // Element from array stores previusly on friends.js
                        var val1 = parseInt(element.scores[i]);
                        // New element to compare
                        var val2 = parseInt(friendObject.scores[i]);

                        result += Math.abs(val1 - val2)
                    }

                    if (result < matchObject.match) {
                        matchObject = {
                            name: element.name,
                            photo: element.photo,
                            scores: element.scores,
                            match: result
                        }
                    }
                    // Inicialize result variable 
                    result = 0
                });

                res.json(matchObject)
            })
        })
    }
}

module.exports = routes;