var url = require("url"),
    sys = require("sys"),
    urls = require("./urls");

var controller = exports;

/* This is the main associative array where
 * we store the mapping of url paths to
 * functions that handle them.
 */

/* We currently store the mapping for all
 * HTTP methods - GET/PUT, etc in the same
 * table. The cache is simply to cache the
 * regex-es, so that we don't have to compile
 * them everytime.
 */
var url_dispatcher = {};
var url_dispatcher_cache = {};

/* Function that populates the above map
 * based on the mappings in urls.py
 */
controller.mapper = function(path, handler){
        url_dispatcher[path] = handler;
}


/* Initialize the url to function map
 * based on the argument of mappings passed
 * to it ( usually from urls.js )
 */
controller.init = function(){
    for (var urlpath in urls.urlpatterns)
        controller.mapper(urlpath, urls.urlpatterns[urlpath]);
}

/* 404 Not Found function */
controller.notFound404 = function(request, response){
    response.writeHead(404);
    response.end("Page Not Found, Sorry!");
};

/*
 * This function serves as a generic URL dispatcher
 * Based on the request method ( GET/POST/PUT/DELETE )
 * and the url path.
 * This is the function provided to the runserver.js
 * file's createServer function, and is invoked for each
 * HTTP request made to the server.
 * Looks in the cache for a matching regex, and if not found,
 * looks in the original table and adds its entries to the
 * regex cache.
 */
controller.handler = function(request, response){
    var pathname = url.parse(request.url).pathname;
    sys.puts("Request for : " + pathname);
    for(var path in url_dispatcher_cache){
        var url_regex = url_dispatcher_cache[path][0];
        var match = false;
        if((match = url_regex.exec(pathname)))
            return url_dispatcher_cache[path][1](request, response,
                    match.slice(1, match.length));
    }
    for(var path in url_dispatcher){
        var url_regex = new RegExp(path);
        url_dispatcher_cache[path] = [url_regex, url_dispatcher[path]];
        var match = false;
        if((match = url_regex.exec(pathname)))
            return url_dispatcher[path](request, response, match.slice(1, match.length));
    }
    return controller.notFound404(request, response);
};
