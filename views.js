var sys = require("sys");

var views = exports;

/*
 * Demonstrates extra arguments being passed to the
 * view function based on the regexp being matched in
 * the urls.js mapping, a-la django.
 */
views.index_func = function(request, response, match){
    response.writeHead(200);
    var str = "index page ";
    response.end(str + match);
}

views.badass_func = function(request, response){
    response.writeHead(200);
    response.end("badass page");
}

views.notepad_func = function(request, response){
    response.writeHead(200);
    sys.pump(request, response);
}
