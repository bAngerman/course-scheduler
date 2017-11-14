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
			var errorCallback = jasmine.createSpy('-invalid event callback-');
			
			course.on('invalid', errorCallback);

		    // What would you need to set on the course properties to
		    // cause validation to fail?

		    course.set({name:''}, {validate: true}); // cannot be empty!

		    var errorArgs = errorCallback.calls.mostRecent().args;

		    expect(errorArgs).toBeDefined();
		    expect(errorArgs[0]).toBe(course);
		    expect(errorArgs[1]).toBe('Course name cannot be empty.');
		});

		// TODO: create validation tests for code, instructor, and classes

		// TODO: create specific tests for classes -> day, start, and end times
	});
});