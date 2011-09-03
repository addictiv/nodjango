var url = require("url"),
    sys = require("sys");

var controller = exports;

/* This is the main associative array where
 * we store the mapping of url paths to
 * functions that handle them.
 */

/* We currently store the mapping for all
 * HTTP methods - GET/PUT, etc in the same
 * table.
 */
urlToViewFunction = {};
var http_methods = ["GET", "POST", "PUT", "DELETE", "HEAD"];
urlToViewFunctionMap = {};

for (var idx in http_methods){
    urlToViewFunction[http_methods[idx]] = urlToViewFunctionMap;
}

// 404 Not Found function
notFound404 = function(request, response){
    response.writeHead(404);
    response.end("Page Not Found, Sorry!");
};

/* Function that populates the above map
 * based on the mappings in urls.py
 */
controller.mapper = function(path, handler){
        urlToViewFunctionMap[path] = handler;
}


/* Initialize the url to function map
 * based on the argument of mappings passed
 * to it ( usually from urls.js )
 */
controller.init = function(map){
    for (var urlpath in map)
        controller.mapper(urlpath, map[urlpath]);
}

/*
 * This function serves as a generic URL dispatcher
 * Based on the request method ( GET/POST/PUT/DELETE )
 * and the url path.
 * This is the function provided to the runserver.js
 * file's createServer function, and is invoked for each
 * HTTP request made to the server.
 */
controller.handler = function(request, response){
    sys.puts("Request for :" + url.parse(request.url).pathname + " handled by:" + urlToViewFunction[request.method][url.parse(request.url).pathname]);
    var handler = urlToViewFunction[request.method][url.parse(request.url).pathname] || notFound404;
    handler(request, response);
};
