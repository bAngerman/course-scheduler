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
            },
            // TODO: complete remaining filter functions (see test.schedule.js)
            forCode: function(code){
                return this.filter(function(course){
                    var codeCheck;
                    if(course.get('code').toUpperCase() === code.toUpperCase()){
                        codeCheck = true;
                    }
                    return codeCheck;
                });
            },

            forName: function (name) {
                return this.filter(function (course) {
                    var nameCheck;
                    if(course.get('name').toUpperCase() === name.toUpperCase()){
                        nameCheck = true;
                    }
                    return nameCheck;
                });
            },

            forInstructor: function (instructor) {
                return this.filter(function(course){
                   var instructorCheck;
                   if(course.get('instructor').toUpperCase() === instructor.toUpperCase()){
                       instructorCheck = true;
                   }
                   return instructorCheck;
                });
            }
        });

    // export the Schedule collection
    app.collections || (app.collections = {});
    app.collections.Schedule = Schedule;

}(this));