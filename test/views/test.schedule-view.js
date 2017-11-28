describe('ScheduleView', function() {
  var view;

  beforeEach(function() {
    view = new app.views.ScheduleView();
    view.render(); // need some DOM elements to test
  });

  describe('renders a view', function() {
    describe('without any courses added', function() {
      it('displays a message that no courses are added or exist', function() {
        // TODO: what should be displayed when there are no courses?
        expect(view.$el.find('p').text()).toEqual('No Courses');
      });
    });

    describe('with a course or courses', function() {
      beforeEach(function() {
        // mock two course mocks for testing
        view.collection = {

          attributes: {
            code: 'COMP1000',
            name: 'Computing 1',
            instructor: 'Jane Doe',
            classes: [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }, { day: 'Friday', start: '10:00AM', end: '12:00PM' }]
          },
          attributes: {
            code: 'COMP1000',
            name: 'Computing 1',
            instructor: 'Jane Doe',
            classes: [{ day: 'Wednesday', start: '1:00PM', end: '3:00PM' }, { day: 'Friday', start: '10:00AM', end: '12:00PM' }]
          }
        }

        view.render();
      });

      xit('renders the expected course or courses', function() {
        // TODO: tests for display of desired courses
      });
    });

    describe('renders when collection is modified', function() {
      xit('displays updated values', function() {
        // TODO: complete the test
        // (hint, need to 'listenTo' the collection in initialize: 
        // see backbone applications text TodoView example)
      });
    });
  });

  describe('supports interactive events', function() {
    xit('listens for the required events', function() {
      var exptectedEvents = {
        // TODO: add event for viewing/modifying a displayed course in the view
      };

      expect(view.events).toEqual(exptectedEvents);
    });

    xit('renders a course for modification when X is clicked', function() {
      // TODO: complete the test for successful click and render
    });
  });
});