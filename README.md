# Grunt-htmlhint-plus

[![Build Status](https://travis-ci.org/poppinlp/grunt-htmlhint-plus.png?branch=master)](https://travis-ci.org/poppinlp/grunt-htmlhint-plus)
[![Dependency Status](https://david-dm.org/poppinlp/grunt-htmlhint-plus.svg)](https://david-dm.org/poppinlp/grunt-htmlhint-plus)
[![devDependency Status](https://david-dm.org/poppinlp/grunt-htmlhint-plus/dev-status.svg)](https://david-dm.org/poppinlp/grunt-htmlhint-plus#info=devDependencies)

Grunt task to hint html code. Support template.

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

### rules {Object}

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

### htmlhintrc {String}

Htmlhintrc file path. Has higher priority than `rules` option.

### force {Boolean}

Throw fatal fail or not at the end of this task, when there is hint error. Default `false`. Only work in global options.

### newer {Boolean}

Only hint changed file and new file. Default `true`. Only work in global options.

### filter {Object}

The options for glob in `files.src`. Please see [options page](https://github.com/isaacs/minimatch#options) for more detail.

### ignore {Object}

Ignore strings between key and value from this object. Default `{}`. Only work in task options.

## Usage Examples

### Basic

```js
// Project configuration
htmlhintplus: {
    html1: {
        rules: {
            'tag-pair': true
        },
        django: false,
        src: ['path/to/file']
    }
}
```

### Use htmlhintrc file

```js
// Project configuration
htmlhintplus: {
    html: {
        src: ['path/to/file'],
        htmlhintrc: 'path/to/file'
    }
}
```

### Use global options

```js
// Project configuration
jsmerge: {
    options: {
        htmlhintrc: 'path/to/file'
    },
    html: {
        src: ['path/to/file']
    }
}
```

### Use glob and filter

```js
// Project configuration
jsmerge: {
    options: {
        htmlhintrc: 'path/to/file'
    },
    html: {
        src: ['**/*.html'],
        filter: {
            cwd: 'path/to/'
        }
    }
}
```

## Demo

Run the test demo:

```shell
grunt test
```

## History

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
