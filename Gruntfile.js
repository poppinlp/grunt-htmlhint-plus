module.exports = function(grunt) {
    grunt.config.init({
        jshint: {
            options: grunt.file.readJSON(__dirname + '/config/jshintrc'),
            www: {
                src: ['tasks/htmlhintplus.js']
            }
        },
        htmlhintplus: {
            dist: {
                src: ['*.html'],
                django: true,
                filter: {
                    cwd: 'test'
                }
            }
        }
    });
    grunt.loadTasks('tasks/');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['jshint', 'htmlhintplus']);
};
