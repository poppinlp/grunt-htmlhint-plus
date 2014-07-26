# Grunt-htmlhint-plus

[![Build Status](https://travis-ci.org/poppinlp/grunt-htmlhint-plus.png?branch=master)](https://travis-ci.org/poppinlp/grunt-htmlhint-plus)

Grunt task to hint html code. Support template.

### Getting Started

This plugin requires Grunt >=0.4.0

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-htmlhint-plus --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-htmlhint-plus');
```

### Htmlhintplus Task

_Run this task with the `grunt htmlhintplus` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### src

Source path.

#### rules

Htmlhint rules. Default is:

- "tagname-lowercase": true
- "attr-lowercase": true
- "attr-value-double-quotes": true
- "doctype-first": true
- "tag-pair": true
- "spec-char-escape": true
- "id-unique": true
- "src-not-empty": true
- "attr-no-duplication": true

The whole rules list please see [Rules](https://github.com/yaniswang/HTMLHint/wiki/Rules).

#### htmlhintrc

Htmlhintrc file path. Has higher priority than `rules` option.

#### django

Open support for django template. Default `false`.

#### force

Throw fatal fail or not at the end of this task, when there is hint error. Default `false`. Only work in global options.

### Usage Examples

#### Basic

```js
// Project configuration
htmlhintplus: {
    html1: {
        rules: {
            'tag-pair': true
        },
        src: ['path/to/**/*.html']
    },
    html2: {
        rules: {
            'tag-pair': true
        },
        src: ['path/to/**/*.html']
    }
}
```

#### Use htmlhintrc file

```js
// Project configuration
htmlhintplus: {
    html: {
        src: ['path/to/**/*.html'],
        htmlhintrc: 'path/to/file'
    }
}
```

#### Use global options

```js
// Project configuration
jsmerge: {
    options: {
        uglify: true
    },
    html: {
        rules: {
            'tag-pair': true
        },
        src: ['path/to/**/*.html']
    }
}
```

### Demo

Run the test demo:

```shell
grunt test
```

### History

- Ver 0.0.2 Fix global options not work
- Ver 0.0.1 Main
