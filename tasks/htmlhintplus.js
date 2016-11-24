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
            _ = require('lodash'),
            checkstyleFormatter = require('checkstyle-formatter'),
            fs = require('fs'),
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
            customRules = [],
            reducedResults = [],
            extendRules = options.extendRules || false,
            outputTypes = options.output ? (_.isArray(options.output) ? options.output : options.output.split('|')) : [ 'console' ];

        outputTypes = _.map(outputTypes, function(type) {
            return type.toString().toLowerCase();
        });

        if (options.hasOwnProperty('customRules') && typeof options.customRules == 'object') {
            customRules = options.customRules;
        }

        // load custom rules
        if (customRules.length) {
            for (var i = 0, len = customRules.length; i < len; i++) {
                var customRule = require(process.cwd() + '/' + customRules[i]);
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
                    if (extendRules) {
                        rules = _.extend(defaultRules, options.rules);
                    } else {
                        rules = options.rules;
                    }
                }

                result = HTMLHint.verify(text, rules);
                if ((result.length > 0) && (_.includes(outputTypes, 'default') || _.includes(outputTypes, 'console'))) {
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

                // update the reduced results collection with this file's info
                if (_.includes(outputTypes, 'checkstyle') || _.includes(outputTypes, 'json') || _.includes(outputTypes, 'text')) {
                    reducedResults.push({
                        filename: file,
                        messages: _.map(result, function(message) {
                            return {
                                line: message.line,
                                column: message.col,
                                severity: message.type,
                                message: message.message,
                                rule: message.rule.id + ': ' + message.rule.description
                            };
                        })
                    });
                }
            });
        });

        fc.save();

        // make sure that the htmlhint directory exists
        if (_.includes(outputTypes, 'checkstyle') || _.includes(outputTypes, 'json')) {
            try {
                fs.accessSync(process.cwd() + '/htmlhint-report');
            } catch(e) {
                fs.mkdirSync(process.cwd() + '/htmlhint-report');
            }
        }

        // write out the checkstyle file
        if (_.includes(outputTypes, 'checkstyle')) {
            try {
                fs.unlinkSync(process.cwd() + '/htmlhint-report/htmlhint-checkstyle-report.xml');
            } catch(e) {}
            try {
                fs.writeFileSync(process.cwd() + '/htmlhint-report/htmlhint-checkstyle-report.xml', checkstyleFormatter(reducedResults));
            } catch(e) {
                grunt.log.writeln("Unable to write ".red + "htmlhint-checkstyle-report.xml".white.bold);
            }
        }

        if (_.includes(outputTypes, 'json')) {
            try {
                fs.unlinkSync(process.cwd() + '/htmlhint-report/htmlhint-checkstyle-report.json');
            } catch(e) {}
            try {
                fs.writeFileSync(process.cwd() + '/htmlhint-report/htmlhint-checkstyle-report.json', JSON.stringify(reducedResults));
            } catch(e) {
                grunt.log.writeln("Unable to write ".red + "htmlhint-checkstyle-report.json".white.bold);
            }
        }

        if (_.includes(outputTypes, 'text')) {
            try {
                fs.unlinkSync(process.cwd() + '/htmlhint-report/htmlhint-checkstyle-report.txt');
            } catch(e) {}
            try {
                var textResults = [];
                for (var i = 0, len = reducedResults.length; i < len; i++) {
                    textResults.push('HtmlHintPlus: ' + reducedResults[i].messages.length + ' warnings in ' + reducedResults[i].filename + '...');
                    textResults.push(_.map(reducedResults[i].messages, function(message) {
                        return "[" + ( "L" + message.line ) + ":" + ( "C" + message.column ) + "]" + ' ' + message.message;
                    }));
                }
                textResults = _.flatten(textResults);
                fs.writeFileSync(process.cwd() + '/htmlhint-report/htmlhint-checkstyle-report.txt', textResults.join('\n'));
            } catch(e) {
                grunt.log.writeln("Unable to write ".red + "htmlhint-checkstyle-report.txt".white.bold);
            }
        }

        if (options.force && hasError) {
            grunt.fail.fatal('Can\'t pass htmlhint. Set \'force\' option to continue.');
        }
    });
};
