describe('ScheduleView', function () {
    var view;

    beforeEach(function () {
        view = new app.views.ScheduleView();
        view.render(); // need some DOM elements to test
    });

    describe('renders a view', function () {

        describe('without any courses added', function () {
            it('displays a message that no courses are added or exist', function () {
                // TODO: what should be displayed when there are no courses?

                expect(view.$el.find('p').text()).toEqual('No Courses');
            });
        });

        describe('with a course or courses', function () {
            beforeEach(function () {
                view.collection.add([
                    {
                        code: 'COMP1000',
                        name: 'Course 1',
                        instructor: 'Jane Doe',
                        classes: [{day: 'Monday', start: '8:00AM', end: '10:00AM'}, {
                            day: 'Thursday',
                            start: '8:00AM',
                            end: '10:00AM'
                        }]
                    },
                    {
                        code: 'COMP1001',
                        name: 'Course 2',
                        instructor: 'Jane Doe',
                        classes: [{day: 'Monday', start: '12:00PM', end: '2:00PM'}]
                    },
                    {
                        code: 'COMP1002',
                        name: 'Course 3',
                        instructor: 'Jon Doe',
                        classes: [{day: 'Wednesday', start: '1:00PM', end: '3:00PM'}]
                    }
                ]);
                view.render();
            });

            describe('displays courses in collection', function () {
                // mock two course mocks for testing
                it('renders the expected course or courses', function () {
                    // TODO: tests for display of desired courses

                    expect(view.$el.find('.list-group-item').length).toEqual(3);

                    expect(view.$el.find('.list-group-item:nth-child(1) span').text()).toEqual('COMP1000: Course 1');
                    expect(view.$el.find('.list-group-item:nth-child(2) span').text()).toEqual('COMP1001: Course 2');
                    expect(view.$el.find('.list-group-item:nth-child(3) span').text()).toEqual('COMP1002: Course 3');

                    // yikes this is ugly
                    //expect(view.$el.find('.list-group-item:nth-child(1):first-child table tr:nth-child(2) td:first-child').text()).toEqual('Monday');
                    expect(view.$el.find('.list-group-item:nth-child(1)').find('.schedule-day').get(0).innerHTML).toEqual('Monday');
                    expect(view.$el.find('.list-group-item:nth-child(1)').find('.schedule-start').get(0).innerHTML).toEqual('8:00AM');
                    expect(view.$el.find('.list-group-item:nth-child(1)').find('.schedule-end').get(0).innerHTML).toEqual('10:00AM');

                    expect(view.$el.find('.list-group-item:nth-child(1)').find('.schedule-day').get(1).innerHTML).toEqual('Thursday');
                    expect(view.$el.find('.list-group-item:nth-child(1)').find('.schedule-start').get(1).innerHTML).toEqual('8:00AM');
                    expect(view.$el.find('.list-group-item:nth-child(1)').find('.schedule-end').get(1).innerHTML).toEqual('10:00AM');
                });
            });

            describe('displays updated courses', function () {
                it('renders the expected values', function () {
                    // TODO: complete the test
                    // (hint, need to 'listenTo' the collection in initialize:
                    // see backbone applications text TodoView example)

                    view.collection.models[0].set({code: 'COMP3000'});

                    expect(view.$el.find('.list-group-item:nth-child(1) span').text()).toEqual('COMP3000: Course 1');

                    view.collection.models[0].set({name: 'Cooking 1'});

                    expect(view.$el.find('.list-group-item:nth-child(1) span').text()).toEqual('COMP3000: Cooking 1');

                    //expect(view.$el.find('.list-group-item:nth-child(1):first-child table tr:nth-child(2) .schedule-day').text()).toEqual('Monday');
                    expect(view.$el.find('.list-group-item:first-child table tr:nth-child(2) .schedule-day').text()).toEqual('Monday');
                    view.collection.models[0].set({classes: [{day: 'Friday', start: '2:00PM', end: '4:00PM'}] });

                    expect(view.$el.find('.list-group-item:nth-child(1):first-child table tr:nth-child(2) .schedule-day').text()).toEqual('Friday');
                    expect(view.$el.find('.list-group-item:nth-child(1):first-child table tr:nth-child(2) .schedule-start').text()).toEqual('2:00PM');
                    expect(view.$el.find('.list-group-item:nth-child(1):first-child table tr:nth-child(2) .schedule-end').text()).toEqual('4:00PM');
                });
            });
        });


    });

    describe('supports interactive events', function () {
        xit('listens for the required events', function () {
            var exptectedEvents = {
                // TODO: add event for viewing/modifying a displayed course in the view
            };

            expect(view.events).toEqual(exptectedEvents);
        });

        xit('renders a course for modification when X is clicked', function () {
            // TODO: complete the test for successful click and render
        });
    });
});