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
            },
            custom: {
                options: {
                    customRules: [
                        'rules/foobar-exists.js',
                        'rules/bad-rule.js'
                    ],
                    rules: {
                        "foobar-exists": true // custom rule that is loaded above
                    },
                    output: 'console|checkstyle|json|text'
                },
                src: ['test/*.html']
            }
        }
    });
    grunt.loadTasks('tasks/');
    grunt.registerTask('test', ['htmlhintplus']);
};
