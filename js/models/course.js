(function(exports) {

	var app = exports.app || (exports.app = {}),

		Course = Backbone.Model.extend({
			defaults: {
				name: '',
				code: '',
				instructor: '',
				classes: []

				// TODO: include remaining defaults
			},

			// TODO: include a funtion to add class times (e.g. addClassTime(time))

			validate: function(attrs) {
				
				var errors = []; // holds all of the validationErrors

			  if (attrs.hasOwnProperty('name') && _.isEmpty(attrs.name)) {
					errors.push({name: 'emptyName', message: 'Course name cannot be empty.'});
				}

				if (attrs.hasOwnProperty('code') && _.isEmpty(attrs.code)) {
					errors.push({name: 'emptyCode', message: 'Course code cannot be empty.'});
				}

				if (attrs.hasOwnProperty('instructor') && _.isEmpty(attrs.instructor)) {
					errors.push({name: 'emptyInstructor', message: 'Instructor\'s name cannot be empty.'});
				} 

			  // TODO: complete validation for the remaining attributes
				// classes can be a bit 'tricky'
				
				return errors.length > 0 ? errors: false; // if there are errors, return them. if there are none then return false
			}
		});

	// export the Course model
	app.models || (app.models = {});
	app.models.Course = Course;

}(this));