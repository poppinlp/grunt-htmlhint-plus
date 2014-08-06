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
            fixPattern = require('dir2pattern'),
            fs = require('fs'),
            nodePath = require('path'),
            config = grunt.config.get('htmlhintplus'),
            ln = grunt.util.linefeed,
            defaultRules = {
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
            cwd = __dirname + nodePath.sep + '..' + nodePath.sep,
            timestampPath = cwd + 'config' + nodePath.sep + 'timestamp.json',
            timestamp = {},
            defaultTimestamp = {},
            globalOptions = extend({
                    force: false,
                    newer: true
                }, config.options || {}
            ),
            encoding = { encoding: 'utf8' },
            hasHint = false,
            task;

        // read timestamp
        if (globalOptions.newer) {
            try {
                timestamp = grunt.file.readJSON(timestampPath, encoding);
            } catch (err) {
                timestamp = defaultTimestamp;
            }
        }

        for (task in config) {
            if (task !== 'options' && config.hasOwnProperty(task)) {
                doTask(config[task]);
            }
        }

        if (globalOptions.newer) {
            grunt.file.write(timestampPath, JSON.stringify(timestamp), encoding);
        }

        if (!globalOptions.force && hasHint) {
            grunt.fail.fatal('Can\'t pass htmlhint. Set force option to continue.');
        }

        function doTask (task) {
            var text, list, len, lastChange, src;

            // 读规则
            if (task.htmlhintrc) {
                task.rules = grunt.file.readJSON(task.htmlhintrc);
            } else if (globalOptions.htmlhintrc) {
                task.rules = grunt.file.readJSON(globalOptions.htmlhintrc);
            } else if (!task.rules) {
                task.rules = defaultRules;
            }

            // 适配字符串或者数组
            len = task.src.length;
            if (len) {
                while (len--) {
                    task.src[len] = fixPattern(task.src[len]);
                }
            } else {
                task.src = fixPattern(task.src);
            }

            // 进行检测
            list = grunt.file.expand(task.filter || {}, task.src);
            if (!timestamp[task]) timestamp[task] = {};
            len = list.length;
            while (len--) {
                src = nodePath.normalize((task.filter ? (task.filter.cwd || '.') : '.') + nodePath.sep + list[len]);
                lastChange = fs.statSync(src).mtime.getTime();
                if (globalOptions.newer && timestamp[task][src] && timestamp[task][src] === lastChange) continue;

                text = grunt.file.read(src, encoding);
                if (globalOptions.django || task.django) {
                    text = django(text);
                }
                text = HTMLHint.verify(text, task.rules);
                if (text.length > 0) {
                    hasHint = true;
                    grunt.log.errorlns('HtmlHintPlus: ' + text.length + ' warnings in ' + src + '...');
                    text.forEach(function (message) {
                        grunt.log.writeln( "[".red + ( "L" + message.line ).yellow + ":".red + ( "C" + message.col ).yellow + "]".red + ' ' + message.message.yellow );
                    });
                } else {
                    grunt.log.ok('HtmlHintPuls: ' + src + ' hint well...');
                    timestamp[task][src] = lastChange;
                }
            }
        }

        function django (text) {
            text = text.replace(/{%\s*else\s*%}[\s\S]*?{%\s*endif\s*%}/img, '');
            return text.replace(/{[%{].*?[%}]}/img, '');
        }

        function extend (self, other) {
            for (var key in other) {
                if (other.hasOwnProperty(key)) {
                    self[key] = other[key];
                }
            }
            return self;
        }
    });
};
