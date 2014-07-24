/*
 * grunt-htmlhint-plus
 * https://github.com/poppinlp/grunt-htmlhint-plus
 *
 * Copyright (c) 2014 "PoppinLp" Liang Peng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('htmlhintplus', 'Validate html files with htmlhint. Support template.', function () {
        var HTMLHint = require("htmlhint").HTMLHint,
            config = grunt.config.get('htmlhintplus'),
            ln = grunt.util.linefeed,
            defaultOptions = {
                "tagname-lowercase": true,
                "attr-lowercase": true,
                "attr-value-double-quotes": true,
                "doctype-first": true,
                "tag-pair": true,
                "spec-char-escape": true,
                "id-unique": true,
                "src-not-empty": true,
                "attr-no-duplication": true
            },
            globalOptions = extend({
                    django: false,
                    force: false
                }, config.options ? config.options : {}
            ),
            hasHint = false,
            task;

        for (task in config) {
            if (config.hasOwnProperty(task)) {
                if (task !== 'options') {
                    doTask(config[task]);
                }
            }
        }

        if (!globalOptions.force && hasHint) {
            grunt.fail.fatal('Can\'t pass htmlhint. Set force option to continue.');
        }

        function doTask (task) {
            var text, len, msg;

            if (task.htmlhintrc) {
                task.rules = grunt.file.readJSON(task.htmlhintrc);
            }

            len = task.src.length;
            while (len--) {
                grunt.file.recurse(task.src[len], function (path, root, sub, file) {
                    if (file[0] === '.' || path[0] === '.' || (sub && sub[0] === '.')) return;
                    text = grunt.file.read(path, { encoding: 'utf8' });
                    if (globalOptions.django || task.django) {
                        text = django(text);
                    }
                    msg = HTMLHint.verify(text, task.rules);
                    if (msg.length > 0) {
                        hasHint = true;
                        grunt.log.errorlns('HtmlHintPlus: ' + msg.length + ' warnings in ' + path + '...');
                        msg.forEach(function (message) {
                            grunt.log.writeln( "[".red + ( "L" + message.line ).yellow + ":".red + ( "C" + message.col ).yellow + "]".red + ' ' + message.message.yellow );
                        });
                    } else {
                        grunt.log.ok('HtmlHintPuls: ' + path + ' hint well...');
                    }
                });
            }
        }

        function django (text) {
            text = text.replace(/{%\s*else\s*%}[\s\S]*?{%\s*endif\s*%}/img, '');
            return text.replace(/{[%{].*?[%}]}/img, '');
        }

        function extend (self, other) {
            var key;
            for (key in other) {
                if (other.hasOwnProperty(key)) {
                    self[key] = other[key];
                }
            }
            return self;
        }
    });
};
