(function(exports) {

	var app = exports.app || (exports.app = {}),

		Course = Backbone.Model.extend({
			defaults: {
				name: ''
				// TODO: include remaining defaults
			},

			// TODO: include a funtion to add class times (e.g. addClassTime(time))

			validate: function(attrs) {
				// TODO: modify this validation to suit your needs
			    if (attrs.hasOwnProperty('name') && _.isEmpty(attrs.name)) {
			        return 'Course name cannot be empty.';
			    }

			    // TODO: complete validation for the remaining attributes
			    // classes can be a bit 'tricky'
			}
		});

	// export the Course model
	app.models || (app.models = {});
	app.models.Course = Course;

}(this));