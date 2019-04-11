var fs = require("fs")
var result = [];

fs.readFile("./app/data/friends.js", "utf8", function(error, data){
    if (error) throw error
    
    data = data.slice(1, (data.length - 1))

    data.split(",").forEach(element => {
        result.push(element);    
    });

})


module.exports = {
    friends: result
}
