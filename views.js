var sys = require("sys");

var views = exports;

views.index_func = function(request, response){
    response.writeHead(200);
    response.end("index page");
}

views.badass_func = function(request, response){
    response.writeHead(200);
    response.end("badass page");
}

views.notepad_func = function(request, response){
    response.writeHead(200);
    sys.pump(request, response);
}
