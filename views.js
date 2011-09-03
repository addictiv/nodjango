var controller = require("./controller")

var views = exports;

views.index_func = function(request, response){
    response.writeHead(200);
    response.end("index page");
}

views.badass_func = function(request, response){
    response.writeHead(200);
    response.end("badass page");
}

