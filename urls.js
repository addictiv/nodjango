var controller = require("./controller");
var views = require("./views");
var urls = exports;

/* Add your url to view function mappings here. */
urls.urlpatterns = {"/": views.index_func,
                    "/index" : views.index_func,
                    "/badass": views.badass_func};
