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

### src

Source path.

### rules

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

### htmlhintrc

Htmlhintrc file path. Has higher priority than `rules` option.

### django

Open support for django template. Default `false`.

### force

Throw fatal fail or not at the end of this task, when there is hint error. Default `false`. Only work in global options.

### newer

Only hint changed file and new file. Default `true`. Only work in global options.

### filter

The src file path filter.See [this page](https://github.com/isaacs/minimatch#options) for more options about filter.

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

### Use file path pattern and filter

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
