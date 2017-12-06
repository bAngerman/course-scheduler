(function(exports) {

	var app = exports.app || (exports.app = {});

	// i think this works?
	app.schedule = new app.collections.Schedule();
	app.view = new app.views.AppView();

    //fire up the router
    app.router = new app.routers.AppRouter();
    Backbone.history.start();

}(this));