var foobarExists = require('./foobar-exists');

module.exports = function ruleAsFunction(HTMLHint) {
    HTMLHint.addRule({
        id: 'foobar-exists-as-function',
        description: foobarExists.description,
        init: foobarExists.init,
    });
}
