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

		// it('ensures at least one class is provided', function() {
		// 	// empty classes array
		// 	course.set({classes: []}, {validate: true});
		// 	expect(_.find(course.validationError, function(err) { return err.name === 'emptyCourseList'; } ).message).toEqual('Provide at least one course.');
		// });
		// see course.js line 180

		it('ensures a course day is provided for each class', function() {
			// missing day property
			course.set({ classes: [{start: '8:00AM', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'missingClassDay'; } ).message).toEqual('Class day is missing.');			
		});

		it('ensures course day is a valid day of the week (and therefore non-empty)', function() {
			// empty day value
			course.set({ classes: [{day: '', start: '8:00AM', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'invalidClassDay'; } ).message).toEqual('Class day cannot be empty or is invalid.');

			// invalid characters/format
			course.set({ classes: [{day: 'Hamburger', start: '8:00AM', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'invalidClassDay'; } ).message).toEqual('Class day cannot be empty or is invalid.');
		});

		it ('ensures start time is provided for each class', function() {
			// missing start property
			course.set({ classes: [{day: 'Monday', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'missingClassStart'; } ).message).toEqual('Class start time is missing.');						
		});

		it('ensures course start time is a valid format (and therefore non-empty)', function() {
			// empty time value
			course.set({ classes: [{day: 'Monday', start: '', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'invalidClassStart'; } ).message).toEqual('Class start time is invalid.');

			// invalid characters/format
			course.set({ classes: [{day: 'Monday', start: '9:00', end: '10:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'invalidClassStart'; } ).message).toEqual('Class start time is invalid.');
		});

		it ('ensures end time is provided for each class', function() {
			// missing end property
			course.set({ classes: [{day: 'Monday', start: '9:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'missingClassEnd'; } ).message).toEqual('Class end time is missing.');						
		});

		it('ensures course end time is a valid format (and therefore non-empty)', function() {
			// empty time value
			course.set({ classes: [{day: 'Tuesday', start: '3:00PM', end: ''}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'invalidClassEnd'; } ).message).toEqual('Class end time is invalid.');
			
			// invalid characters/format
			course.set({ classes: [{day: 'Tuesday', start: '3:00PM', end: '1:asd'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'invalidClassEnd'; } ).message).toEqual('Class end time is invalid.');
		});

		it('ensures course end time does not occur before start time', function() {
			
			// starts after noon, ends before noon.
			course.set({ classes: [{day: 'Tuesday', start: '1:00PM', end: '9:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'classStartEndConflict'; } ).message).toEqual('Class end time cannot occur before start time.');
			
			// starts at the same time it ends.
			course.set({ classes: [{day: 'Tuesday', start: '9:00AM', end: '9:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'classStartEndConflict'; } ).message).toEqual('Class end time cannot occur before start time.');
			
			// starts on same hour, but later minute.
			course.set({ classes: [{day: 'Tuesday', start: '9:59PM', end: '9:00PM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'classStartEndConflict'; } ).message).toEqual('Class end time cannot occur before start time.');
		
			// values before noon
			course.set({ classes: [{day: 'Tuesday', start: '11:00AM', end: '9:00AM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'classStartEndConflict'; } ).message).toEqual('Class end time cannot occur before start time.');
		
			// values after noon
			course.set({ classes: [{day: 'Tuesday', start: '4:00PM', end: '2:00PM'}] }, {validate: true});
			expect(_.find(course.validationError, function(err) { return err.name === 'classStartEndConflict'; } ).message).toEqual('Class end time cannot occur before start time.');
		
			// starts after midnight, ends before midnight (should send a validationError but currently doesnt... maybe later)
			// course.set({ classes: [{day: 'Tuesday', start: '1:00AM', end: '11:00PM'}] }, {validate: true});
			// expect(_.find(course.validationError, function(err) { return err.name === 'classStartEndConflict'; } ).message).toEqual('Class end time cannot occur before start time.');
		});
	});

	describe('supports adding class times', function() {
		it('only allows adding {day, start, end} objects', function() {
			// test with invalid value
			course.addClass('');

			expect(course.get('classes').length).toEqual(0);

			// test with invalid object
			course.addClass({ start: '1:00PM', end: '3:00PM' });
			expect(course.get('classes').length).toEqual(0);

			// test with acceptable object
			course.addClass({ day: 'Wednesday', start: '1:00PM', end: '3:00PM' });
			expect(course.get('classes').length).toEqual(1);
			course.addClass({ day: 'Friday', start: '12:00PM', end: '2:00PM' });
			expect(course.get('classes').length).toEqual(2);

			// UPGRADE: ensure that class times cannot be duplicated or overlap
		});
	});

	describe('supports removing class times', function() {
		var removedClass;

		beforeEach(function() {
			// direct setting of good classes array
			course.attributes.classes = [
				{ day: 'Monday', start: '1:00PM', end: '3:00PM' },
				{ day: 'Tuesday', start: '9:00AM', end: '11:00AM' },
				{ day: 'Friday', start: '10:00AM', end: '12:00PM' }
			];
		});

		it('removes class time objects', function() {
			var classToRemove;

			// random invalid reference
			course.removeClass('');
			expect(course.get('classes').length).toEqual(3);

			// good reference, remove the second class time
			removedClass = course.removeClass(course.get('classes')[1]);
			expect(course.get('classes').length).toEqual(2);
			expect(course.get('classes').indexOf(removedClass)).toBe(-1);
		});

		it('removes class time objects by index', function() {
			// random invalid index
			course.removeClass(3);
			expect(course.get('classes').length).toEqual(3);

			// good index
			removedClass = course.removeClass(1);
			expect(course.get('classes').length).toEqual(2);
			expect(course.get('classes').indexOf(removedClass)).toBe(-1);
		});
	});
});