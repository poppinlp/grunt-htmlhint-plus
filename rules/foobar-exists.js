module.exports = {
	id: 'foobar-exists',
	description: 'Checks that the data-foobar attribute exists on the html element',
	init: function (parser, reporter) {
		var self = this;
		parser.addListener('tagstart', function (event) {
			var tagName = event.tagName.toLowerCase(),
				mapAttrs = parser.getMapAttrs(event.attrs),
				col = event.col + tagName.length + 1;
			if (tagName === 'html' && !('data-foobar' in mapAttrs)) {
				reporter.warn('data-foobar of html tag must be present.', event.line, col, self, event.raw);
			}
		});
	}
};
