describe('AppView', function() {
  var view;

  beforeEach(function() {
    view = new app.views.AppView();
    // tied to the body elements, no need to render
  });

  // require fixtures in order to test this correctly since the view is tied to an existing element,
  // the required DOM elements need to be present in the text/index.html
  xdescribe('displays the schedule', function() {
    it('renders the schedule view', function() {
      expect(view.$el.find('.schedule-display').html()).not.toBeEmpty();
    });
  });

  xdescribe('supports interactive events', function() {
    it('listens for the required events', function() {
      var exptectedEvents = {
        'click a.add-course': 'renderCourseView'
      };

      expect(view.events).toEqual(exptectedEvents);
    });

    it('renders a course view when a.add-course is clicked', function() {
      expect(view.$el.find('.course-display').html()).toBeEmpty();

      view.$el.find('a.add-course').trigger('click');

      expect(view.$el.find('.course-display').html()).not.toBeEmpty();
    });
  });
});