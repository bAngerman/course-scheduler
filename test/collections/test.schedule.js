describe('Schedule', function() {
    var schedule;

    beforeEach(function() {
        schedule = new app.collections.Schedule();
        schedule.add([
            { code: 'COMP1000', name: 'Course 1', instructor: 'Jane Doe', classes: [{ day: 'Monday', start: '8:00AM', end: '10:00AM' }, { day: 'Thursday', start: '8:00AM', end: '10:00AM' }] },
            { code: 'COMP1001', name: 'Course 2', instructor: 'Jane Doe', classes: [{ day: 'Monday', start: '12:00PM', end: '2:00PM' }] },
            { code: 'COMP1002', name: 'Course 3', instructor: 'Jon Doe', classes: [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }] }
        ]);
    });

    describe('Allows for adding courses', function() {
        it('contains a Course model', function() {
            expect(schedule.model).toBe(app.models.Course);
        });
    });

    describe('Provides filters', function() {
        describe('Filters courses by day of week', function() {
            it('Returns only courses with classes on a desired day', function() {
                expect(schedule.forDay('monday').length).toEqual(2);
                expect(schedule.forDay('tuesday').length).toEqual(0);
            });
        });
        // TODO: complete tests for filter by code, name, and instructor (name these functions appropriately)
        describe('Filters course by code', function () {
            it('Returns only courses with the specified code', function () {
                expect(schedule.forCode('COMP1002').length).toEqual(1);
                expect(schedule.forCode('COMP1010').length).toEqual(0);
            });
        });

        describe('Filters courses by name', function () {
            it('Returns only courses with the specified name', function () {
                expect(schedule.forName('Course 2').length).toEqual(1);
                expect(schedule.forName('Course 4').length).toEqual(0);
            });
        });

        describe('Filters course by instructor', function () {
            it('Returns only courses with the specified instructor', function () {
                expect(schedule.forInstructor('Jane Doe').length).toEqual(2);
                expect(schedule.forInstructor('').length).toEqual(0);
            });
        });
    });
});