(function(exports) {

	var app = exports.app || (exports.app = {}),

		Course = Backbone.Model.extend({
			defaults: function() {
				return {
					name: '',
					code: '',
					instructor: '',
					classes: []
				};
				// TODO: include remaining defaults
			},

			/**
			 * Adds a class time object to this course.
			 * @param {Object} classTime - a single class time representation
			 * @param {string} classTime.day - the day of the week for the class
			 * @param {string} classTime.start - the start time for the class
			 * @param {string} classTime.end - the end time for the class
			 * @returns {Boolean|undefined} - the result from calling the validate() function or undefined if the classTime did not have the required attributes
			 */
			addClass: function(classTime) {
				// light validation at this level
				if (_.isObject(classTime) && classTime.hasOwnProperty('day') && classTime.hasOwnProperty('start') && classTime.hasOwnProperty('end')) {
					
					// why do we push the class times before validating them?
					this.attributes.classes.push(classTime);

					this.trigger('change'); // force a render
					
					return this.isValid(); // trigger full validation
				}
			},

			/**
			 * Removes a class time from this course.
			 * @param {Object|number} value - the actual class time object to remove or the index of the class to remove
			 * @returns {Object|undefined} - the removed class time object if successful or undefined if no object was removed
			 */
			removeClass: function(value) {
				var idx;

				if (_.isNumber(value)) {
					// remove by index
					if (value >= 0 && value < this.attributes.classes.length) {
							return this.attributes.classes.splice(value, 1);
					}
				} else if (_.isObject(value)) {
					// remove by ref
					if ((idx = this.attributes.classes.indexOf(value)) > -1) {
							return this.attributes.classes.splice(idx, 1);
					}
				}
			},

			validate: function(attrs) {
				
				var errors = []; // holds all of the validationErrors
				var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']; // these are good day values

				/**
				 * Helper function to reduce repitition when validating for classes' day, start, and end key existence.
				 * 
				 * @param {string} type - either 'day', 'start', or 'end'.
				 */
				function classesKeyMissing(type) {
					var missing = false;
					attrs.classes.forEach(function(row) {
						if (!_.has(row, type)) {
							missing = true;
						}
					});
					return missing;
				}
				
				/**
				 * Checks if course day is non-empty, and valid.
				 */
				function invalidClassDay() {
					var invalid = false;
					attrs.classes.forEach(function(row) {
						if (typeof row.day !== 'undefined') {
							if (_.indexOf(days, row.day.toLowerCase()) === -1) {
								invalid = true;
							}
						}
					});
					return invalid;
				}

				/**
				 * Checks if course times are both non-empty and correctly formatted.
				 * 
				 * @param {string} type - either 'start' or 'end'
				 */
				function invalidClassTime(type) {
					var fmt = new RegExp("^((10|11|12|[1-9]):[0-5][0-9][A|P][M])$");
					var invalid = false;
					attrs.classes.forEach(function(row) {
						if (type == 'start') {
							if (!fmt.test(row.start)) { 
								invalid = true;
							}
						}
						else if (type == 'end') {
							if (!fmt.test(row.end)) {
								invalid = true;
							}
						}	
					});
					return invalid;
				}

				/**
				 * Returns an array holding the 24hr format values after converting the 12hr time passed in.
				 * 
				 * @param {string} time - 12hr format
				 */
				function timeFormat(time) {
					var hrs,
							formattedTime = [];
					time = time.split(':');
					hrs = parseInt(time[0]);
					if ((time[1].indexOf('AM') != -1 && hrs != 12) || (time[1].indexOf('PM') != -1 && hrs == 12)) { // 1AM -> 12:59PM
						formattedTime.hrs = hrs;
						formattedTime.mins = parseInt(time[1]);
					}
					else if (time[1].indexOf('PM') != -1 && hrs != 12) { // 1PM -> 11:59PM
						formattedTime.hrs = hrs + 12;
						formattedTime.mins = parseInt(time[1]);
					}
					else if (time[1].indexOf('AM') != -1 && hrs == 12) { // 12AM
						formattedTime.hrs = hrs - 12;
						formattedTime.mins = parseInt(time[1]);
					}
					return formattedTime;
				}

				/**
				 * Determines whether end time occurs before start time in a class.
				 * NOTE: This does not compare properly if the class starts at night, and ends the next morning. Which probably wont happen anyways.
				 */
				function invalidEndBeforeStart() {
					var	invalid = false,
							startTime,
							endTime;
					attrs.classes.forEach(function(row) {
						if (typeof row.start != 'undefined' && typeof row.end != 'undefined') {
							startTime = timeFormat(row.start);
							endTime = timeFormat(row.end);
							// console.log(startTime);
							// console.log(endTime);
							if (startTime.hrs > endTime.hrs) {
								invalid = true;
							}
							else if (startTime.hrs == endTime.hrs && startTime.mins >= endTime.mins) { //same hr, but end minutes are earlier or the same
								invalid = true;
							}
						}
					});
					return invalid;
				}

			  if (attrs.hasOwnProperty('name') && _.isEmpty(attrs.name)) {
					errors.push({name: 'emptyName', message: 'Course name cannot be empty.'});
				}

				// TODO: complete validation for the remaining attributes
				// classes can be a bit 'tricky'

				if (attrs.hasOwnProperty('code') && _.isEmpty(attrs.code)) {
					errors.push({name: 'emptyCode', message: 'Course code cannot be empty.'});
				}

				if (attrs.hasOwnProperty('instructor') && _.isEmpty(attrs.instructor)) {
					errors.push({name: 'emptyInstructor', message: 'Instructor\'s name cannot be empty.'});
				}

				// if (attrs.hasOwnProperty('classes') && _.isEmpty(attrs.classes)) {
				// 	errors.push({name: 'emptyCourseList', message: 'Provide at least one course.'});
				// }
				// We probably dont want to check this here since we have an addClass helper function.

				if (attrs.hasOwnProperty('classes') && classesKeyMissing('day')) {
					errors.push({name: 'missingClassDay', message: 'Class day is missing.'});						
				}

				if(attrs.hasOwnProperty('classes') && invalidClassDay()) {
					errors.push({name: 'invalidClassDay', message: 'Class day cannot be empty or is invalid.'});											
				}

				if (attrs.hasOwnProperty('classes') && classesKeyMissing('start')) {
					errors.push({name: 'missingClassStart', message: 'Class start time is missing.'});						
				}

				if (attrs.hasOwnProperty('classes') && invalidClassTime('start')) {
					errors.push({name: 'invalidClassStart', message: 'Class start time is invalid.'});						
				}

				if (attrs.hasOwnProperty('classes') && classesKeyMissing('end')) {
					errors.push({name: 'missingClassEnd', message: 'Class end time is missing.'});											
				}

				if (attrs.hasOwnProperty('classes') && invalidClassTime('end')) {
					errors.push({name: 'invalidClassEnd', message: 'Class end time is invalid.'});						
				}

				if (attrs.hasOwnProperty('classes') && !invalidClassTime('start') && !invalidClassTime('end')) { // validate times before attempting to compare/work with them
					if (invalidEndBeforeStart()) {
						errors.push({name: 'classStartEndConflict', message: 'Class end time cannot occur before start time.'});						
					}
				}

				//console.log(errors);
				
				return errors.length > 0 ? errors: false; // if there are errors, return them. if there are none then return false
			}
		});

	// export the Course model
	app.models || (app.models = {});
	app.models.Course = Course;

}(this));