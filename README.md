# Grunt-htmlhint-plus

[![Build Status](https://travis-ci.org/poppinlp/grunt-htmlhint-plus.png?branch=master)](https://travis-ci.org/poppinlp/grunt-htmlhint-plus)
[![Dependency Status](https://david-dm.org/poppinlp/grunt-htmlhint-plus.svg)](https://david-dm.org/poppinlp/grunt-htmlhint-plus)
[![devDependency Status](https://david-dm.org/poppinlp/grunt-htmlhint-plus/dev-status.svg)](https://david-dm.org/poppinlp/grunt-htmlhint-plus#info=devDependencies)

Grunt task to hint html code.

## Getting Started

This plugin requires Grunt >=0.4.0

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-htmlhint-plus --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-htmlhint-plus');
```

## Htmlhintplus Task

_Run this task with the `grunt htmlhintplus` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

## Options

### src {String|Array}

Source path. Support file path, glob and globs.

### options.rules {Object}

Htmlhint rules. Default is:

- "tagname-lowercase": true,
- "attr-lowercase": true,
- "attr-value-double-quotes": true,
- "attr-value-not-empty": true,
- "attr-no-duplication": true,
- "doctype-first": true,
- "tag-pair": true,
- "tag-self-close": false,
- "spec-char-escape": true,
- "id-unique": true,
- "src-not-empty": true,
- "head-script-disabled": false,
- "img-alt-require": true,
- "doctype-html5": true,
- "id-class-value": "dash",
- "style-disabled": false,
- "space-tab-mixed-disabled": true,
- "id-class-ad-disabled": true,
- "href-abs-or-rel": true,
- "attr-unsafe-chars": true

For the whole rules list, please see [Rules page](https://github.com/yaniswang/HTMLHint/wiki/Rules).

### options.htmlhintrc {String}

Htmlhintrc file path. Has higher priority than `rules` option.

### options.force {Boolean}

Throw fatal fail or not at the end of this task, when there is hint error. Default `false`.

### options.newer {Boolean}

Only hint changed file and new file. Default `true`.

### ignore {Object}

Ignore strings between key and value from this object. Default `{}`.

## Usage Examples

### Basic

```js
// Project configuration
htmlhintplus: {
    build: {
        options: {
            rules: {
                'tag-pair': true
            }
        }
        src: 'path/to/file'
    }
}
```

### Use htmlhintrc file

```js
// Project configuration
htmlhintplus: {
    html: {
        options: {
            htmlhintrc: 'path/to/file'
        }
        src: [
            'path/to/file',
            'path/to/file2'
        ]
    }
}
```

### Use global options

```js
// Project configuration
htmlhintplus: {
    options: {
        htmlhintrc: 'path/to/file',
        newer: true
    },
    build: {
        options: {
            force: false
        },
        src: [
            'path/1/*.html',
            'path/2/**/*.html'
        ]
    }
}
```

## Demo

Run the test demo:

```shell
grunt test
```

## History

- Ver 0.1.0
    - Use [file-changed](https://github.com/poppinlp/file-changed) to do newer job
    - Reconstruct whole project, make it easy to use
- Ver 0.0.7 Remove `django` option; Add `ignore` option to support it and more; Fix some bugs; Add default rules
- Ver 0.0.6 Update `dir2pattern` to 0.0.4
- Ver 0.0.5 Bugfix
- Ver 0.0.4
    - Fix README
    - Bugfix about `filter.cwd`
    - Update `dir2pattern` to 0.0.3 to fix bug
- Ver 0.0.3
    - Support `newer` config option
    - Support file path pattern
    - Support path filter
- Ver 0.0.2 Fix global options not work
- Ver 0.0.1 Main

