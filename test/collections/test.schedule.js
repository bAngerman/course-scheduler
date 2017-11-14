describe('Schedule', function() {
    var schedule;

    beforeEach(function() {
        schedule = new app.collections.Schedule();
    });

    describe('Allows for adding courses', function() {
        it('contains a Course model', function() {
            expect(schedule.model).toBe(app.models.Course);
        });
    });

    describe('Provides filters', function() {
        describe('Filters courses by day of week', function() {
            beforeEach(function() {
            	// Add some courses to test the filter functionality of the collection
                schedule.add([
                    { code: 'COMP1000', name: 'Course 1', instructor: 'Jane Doe', classes: [{ day: 'Monday', start: '8:00AM', end: '10:00AM' }, { day: 'Thursday', start: '8:00AM', end: '10:00AM' }] },
                    { code: 'COMP1001', name: 'Course 2', instructor: 'Jane Doe', classes: [{ day: 'Monday', start: '12:00PM', end: '2:00PM' }] },
                    { code: 'COMP1002', name: 'Course 3', instructor: 'Jon Doe', classes: [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }] }
                ]);
            });

            it('Returns only courses with classes on a desired day', function() {
                expect(schedule.forDay('monday').length).toEqual(2);
                expect(schedule.forDay('tuesday').length).toEqual(0);
            });
        });
        // TODO: complete tests for filter by code, name, and instructor (name these functions appropriately)
    });
});