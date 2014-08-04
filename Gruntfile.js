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
                src: ['test/*.html'],
                django: true
            }
        }
    });
    grunt.loadTasks('tasks/');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['jshint', 'htmlhintplus']);
};
