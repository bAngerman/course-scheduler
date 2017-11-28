(function(exports) {

	var app = exports.app || (exports.app = {});

	// i think this works?
	app.schedule = new app.collections.Schedule();
	app.view = new app.views.AppView();

}(this));