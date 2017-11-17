describe('Course', function() {
	
	var course;

	beforeEach(function() {
		course = new app.models.Course(); // this is how to export
	});

	describe('contains default attributes', function() {
		it('has a name set to \'\'', function() {
			expect(course.get('name')).toEqual('');
		});
		it('has a code set to \'\'', function() {
			expect(course.get('code')).toEqual('');
		});
		it('has a instructor set to \'\'', function() {
			expect(course.get('instructor')).toEqual('');
		});
		it('has a classes list set to an empty array', function() {
			expect(course.get('classes')).toEqual([]);
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

			course.set({name: ''}, {validate: true}); 

			// course.validationError is a list of errors sent from the course's validate function
			// _.find is an underscore.js function that takes in a list, and a predicate ( _.find(list, predicate) )
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

		it('ensures at least one class is provided', function() {
			course.set({classes: []}, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'emptyCourseList'; } ).message).toEqual('Provide at least one course.');
		});

		// copy pasta
		// classes: [{ day: 'Monday', start: '8:00AM', end: '10:00AM' }, { day: 'Thursday', start: '8:00AM', end: '10:00AM' }]

		it('ensures a course day is provided for each class', function() {
			course.set({ classes: [{start: '8:00AM', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'missingClassDay'; } ).message).toEqual('Class day is missing.');			
		});

		it('ensures course day is a valid day of the week (and therefore non-empty)', function() {
			course.set({ classes: [{day: 'Hamburger', start: '8:00AM', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'invalidClassDay'; } ).message).toEqual('Class day cannot be empty or is invalid.');
		});

		it ('ensures start time is provided for each class', function() {
			course.set({ classes: [{day: 'Monday', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'missingClassStart'; } ).message).toEqual('Class start time is missing.');						
		});

		it('ensures course start time is a valid format (and therefore non-empty)', function() {
			course.set({ classes: [{day: 'Monday', start: '9:00', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'invalidClassStart'; } ).message).toEqual('Class start time is invalid.');
		});

		it ('ensures end time is provided for each class', function() {
			course.set({ classes: [{day: 'Monday', start: '9:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'missingClassEnd'; } ).message).toEqual('Class end time is missing.');						
		});

		it('ensures course end time is a valid format (and therefore non-empty)', function() {
			course.set({ classes: [{day: 'Tuesday', start: '3:00PM', end: '1:asd'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'invalidClassEnd'; } ).message).toEqual('Class end time is invalid.');
		});

		it('ensures course end time does not occur before start time', function() {
			course.set({ classes: [{day: 'Tuesday', start: '1:00PM', end: '9:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'classStartEndConflict'; } ).message).toEqual('Class end time cannot occur before start time.');
		});

		// TODO: create specific tests for classes -> day, start, and end times
	});

});