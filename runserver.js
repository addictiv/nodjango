var http = require("http"),
    /* The bottom two are our modules
     * The controller and urls correspond to
     * the django MTV pattern, similar to the MVC
     * pattern.
     *
     * The controller handles the routing of requests
     * to the different View functions, defined
     * according to the urls module.
     */
    controller = require("./controller"),
    urls = require("./urls");

/* Initialize the mapping of request to View functions
 * in the controller, based on the mappings defined in
 * urls.js
 */
controller.init(urls.urlpatterns);

// Start the server.
var server = http.createServer(controller.handler).listen(8000);
