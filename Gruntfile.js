module.exports = function(grunt) {
    grunt.config.init({
        htmlhintplus: {
            options: {
                force: false,
                newer: false
            },
            dist: {
                options: {
                    ignore: {
                        '{{': '}}'
                    }
                },
                src: ['test/*.html']
            }
        }
    });
    grunt.loadTasks('tasks/');
    grunt.registerTask('test', ['htmlhintplus']);
};
