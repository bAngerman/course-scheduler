(function(exports) {
  
  var app = exports.app || (exports.app = {}),

  ScheduleView = Backbone.View.extend({
    tagName: 'div',

    template: Handlebars.compile($('#schedule-view-template').html()),

    events: {
      // TODO: event listener to view/modify an existing course
      // TODO: [OPTIONAL] event(s) to filter the view
      'click .btn.delete-time': 'removeClassTime'
    },

    initialize: function(options) {
      this.options = options || {};

      if (!this.options.collection) {
          this.collection = new app.collections.Schedule();
      }

      // TODO: the view should listen to the model for changes and render
        this.listenTo(this.collection, 'change', this.render);
        this.listenTo(this.collection, 'add', this.render);
    },

    render: function() {
      this.$el.html(this.template({ courses: this.collection.models }));
      return this;
    },

    removeClassTime: function(evt) {
      var parentIdx = parseInt(evt.target.dataset.parent),
          idx = parseInt(evt.target.dataset.index);

      if (this.collection.models[parentIdx].removeClass(idx) != 'undefined') {
        this.render();
      }
    },

      modifyCourse: function(evt) {
          app.appView.renderCourseView(evt, this.collection.get(evt.currentTarget.dataset['id']));
          app.router.navigate('courses/' + evt.currentTarget.dataset['id'], {trigger:true});
      }
  });

  // export the ScheduleView model
  app.views || (app.views = {});
  app.views.ScheduleView = ScheduleView;

}(this));