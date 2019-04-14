
var express = require("express");
var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 8080

app.listen(PORT, error => {
    if (error) console.error(error)
    console.log("The server is listening on http://localhost:" + PORT)
})


// require("./app/routing/apiRoutes").apiRoutes(app)
require("./app/routing/apiRoutes").apiRoutes(app)

// require("./app/routing/apiRoutes").htmlRoutes(app)
require("./app/routing/htmlRoutes").htmlRoutes(app);
