(function(exports) {
    var app = exports.app || (exports.app = {}),

        Schedule = exports.Backbone.Collection.extend({
            model: app.models.Course,

            forDay: function(day) {
                return this.filter(function(course) {
                    var courseCheck;

                    course.get('classes').forEach(function(classTime) {
                        if (classTime.day.toLowerCase() === day.toLowerCase()) {
                            courseCheck = true;
                        }
                    });

                    return courseCheck;
                });
            }

            // TODO: complete remaining filter functions (see test.schedule.js)
        });

    // export the Schedule collection
    app.collections || (app.collections = {});
    app.collections.Schedule = Schedule;

}(this));