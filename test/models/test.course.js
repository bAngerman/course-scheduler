describe('Course', function() {
	
	var course;

	beforeEach(function() {
		course = new app.models.Course(); // this is how to export
	});

	describe('contains default attributes', function() {
		it('has a name set to \'\'', function() {
			expect(course.get('name')).toEqual('');
		});
		// TODO: create tests for the remaining default attributes
		// code, instructor, and classes
	});

	describe('validates set attributes', function() {
		
		it('ensures a non-empty name is provided', function() {

			// ---------- This is Nathan's in class way -------------
			// var errorCallback = jasmine.createSpy('-invalid event callback-');
			
			// course.on('invalid', errorCallback);

		    // // What would you need to set on the course properties to
		    // // cause validation to fail?

		    // course.set({name:''}, {validate: true}); // cannot be empty!

		    // var errorArgs = errorCallback.calls.mostRecent().args;

		    // expect(errorArgs).toBeDefined();
		    // expect(errorArgs[0]).toBe(course);
			// expect(errorArgs[1]).toBe('Course name cannot be empty.');
			// -------------------------------------------------------

			// empty name
			course.set({name: ''}, {validate: true}); 

			// course.validationError is a list of errors sent from the course's validate function
			// _.find is an undescores function that takes in a list, and a predicate ( _.find(list, predicate) )
			// I reason that the underscore dependancy is okay because the Backbone.js .set function itself relies on underscore.
			// the predicate to check whether the error exist is a function that returns true of false based on whether the course exsts.
    	expect(_.find(course.validationError, function(err) { return err.name === 'emptyName'; } ).message).toEqual('Course name cannot be empty.');
		});

		// TODO: create validation tests for code, instructor, and classes

		it('ensures a non-empty code is provided', function() {
			course.set({code: ''}, {validate: true}); // empty code
			expect(_.find(course.validationError, function(err) { return err.name === 'emptyCode'; } ).message).toEqual('Course code cannot be empty.');
		});

		it('ensures a non-empty instructor is provided', function() {
			course.set({instructor: ''}, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'emptyInstructor'; } ).message).toEqual('Instructor\'s name cannot be empty.');			
		});

		// TODO: create specific tests for classes -> day, start, and end times
	});

});