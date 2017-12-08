(function(exports) {
    var app = exports.app || (exports.app = {}),

        AppRouter = exports.Backbone.Router.extend({


            routes: {
                'index': 'index',               // /route
                'courses/:id': 'renderCourse',  // #courses/12
            },

            index: function () {
                app.schedule.fetch();
                this.sync();
            },

            renderCourse: function (id) {
            
                // fake event object
                var evt = {
                    preventDefault: function () {
                        return false;
                    }
                }
                app.schedule.fetch();
                app.AppView.renderCourseView(evt, app.schedule.get(id));
            }

        });

    // export the Schedule collection
    app.routers || (app.routers = {});
    app.routers.AppRouter = AppRouter;

}(this));