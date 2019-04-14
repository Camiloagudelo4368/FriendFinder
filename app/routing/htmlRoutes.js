var path = require("path");

var routes = {
    htmlRoutes: function(app) {
        // Request home
        app.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, "../public/home.html"));
        })

        app.get("/:route", function (req, res) {

            switch (req.params.route) {
                case "survey":
                    res.sendFile(path.join(__dirname, "../public/survey.html"));
                    break;
                default:
                    res.sendFile(path.join(__dirname, "../public/home.html"));
                    break;
            }
        })
    }
}

module.exports = routes