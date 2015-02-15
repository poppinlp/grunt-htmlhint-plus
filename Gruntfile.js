module.exports = function(grunt) {
    grunt.config.init({
        htmlhintplus: {
            dist: {
                src: ['*.html'],
                ignore: {
                    '{%': '%}',
                    '{{': '}}'
                },
                filter: {
                    cwd: 'test'
                }
            }
        }
    });
    grunt.loadTasks('tasks/');
    grunt.registerTask('test', ['htmlhintplus']);
};
