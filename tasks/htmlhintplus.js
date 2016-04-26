/*
 * grunt-htmlhint-plus
 * https://github.com/poppinlp/grunt-htmlhint-plus
 *
 * Copyright (c) 2014 "PoppinLp" Liang Peng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('htmlhintplus', 'Validate html files with htmlhint.', function () {
        var HTMLHint = require("htmlhint").HTMLHint,
            fc = require('file-changed'),
            defaultRules = {
                "tagname-lowercase": true,
                "attr-lowercase": true,
                "attr-value-double-quotes": true,
                "attr-value-not-empty": true,
                "attr-no-duplication": true,
                "doctype-first": true,
                "tag-pair": true,
                "tag-self-close": false,
                "spec-char-escape": true,
                "id-unique": true,
                "src-not-empty": true,
                "head-script-disabled": false,
                "img-alt-require": true,
                "doctype-html5": true,
                "id-class-value": "dash",
                "style-disabled": false,
                "space-tab-mixed-disabled": true,
                "id-class-ad-disabled": true,
                "href-abs-or-rel": true,
                "attr-unsafe-chars": true
            },
            options = this.options(),
            hasError = false,
            customRules = [];

        if (options.hasOwnProperty('customRules') && typeof options.customRules == 'object') {
            customRules = options.customRules;
        }

        // load custom rules
        if (customRules.length) {
            for (var i = 0, len = customRules.length; i < len; i++) {
                var customRule = require(process.env.PWD + '/' + customRules[i]);
                if (
                  typeof customRule == 'object' &&
                  customRule.hasOwnProperty('id') &&
                  customRule.hasOwnProperty('description') &&
                  customRule.hasOwnProperty('init')
                ) {
                    HTMLHint.addRule(customRule);
                } else {
                    console.error("[error]".red.bold, customRules[i].bold, "was invalid and could not be loaded.".red);
                }
            }
        }

        this.files.map(function (files) {
            files.src.map(function (file) {
                if (options.newer && fc.addFile(file).check(file).length === 0) return;

                var text = grunt.file.read(file),
                    rules = defaultRules,
                    key,
                    reg,
                    result;

                if (options.ignore) {
                    for (key in options.ignore) {
                        if (options.ignore.hasOwnProperty(key)) {
                            reg = new RegExp(key + '.*?' + options.ignore[key], 'ig');
                            text = text.replace(reg, 'x');
                        }
                    }
                }

                if (options.htmlhintrc) {
                    rules = grunt.file.readJSON(options.htmlhintrc);
                } else if (options.rules) {
                    rules = options.rules;
                }

                result = HTMLHint.verify(text, rules);
                if (result.length > 0) {
                    hasError = true;
                    grunt.log.errorlns('HtmlHintPlus: ' + result.length + ' warnings in ' + file + '...');
                    result.forEach(function (msg) {
                        grunt.log.writeln( "[".red + ( "L" + msg.line ).yellow + ":".red + ( "C" + msg.col ).yellow + "]".red + ' ' + msg.message.yellow );
                    });
                } else {
                    if (options.newer) {
                        fc.addFile(file).update(file);
                    }
                    grunt.log.ok('HtmlHintPlus: ' + file + ' hint well...');
                }
            });
        });

        fc.save();

        if (options.force && hasError) {
            grunt.fail.fatal('Can\'t pass htmlhint. Set \'force\' option to continue.');
        }
    });
};
