/* global it, describe */
var path = require('path');
var execFile = require('child_process').execFile;
var xml2js = require('xml2js');

module.exports = function (paths) {
	if(typeof paths === 'string'){
		paths = [paths];
	}
	paths = paths || ['.'];
	paths.forEach(function (p) {
		describe('csslint of ' + (p === '.' ? 'working directory' : p), function () {
			it("lints without errors", function (done) {
				return execFile(
					'node',
					[path.join(__dirname, 'node_modules/csslint/cli.js'), '--format=lint-xml', path.resolve(p)],
					{ maxBuffer: 524288 },
					processCssLintOutput
				);

				function processCssLintOutput(err, stdout) {
					if (err) {
						return done(err);
					}
					return xml2js.parseString(stdout || "", function (err, result) {
						if (err) {
							return done(err);
						}
						var rawFilesWithProblems = result && result.lint && result.lint.file;
						if (!rawFilesWithProblems) {
							return done();
						}
						var filesWithProblems = rawFilesWithProblems.map(function (f) {
							return {
								name: f.$.name,
								issues: f.issue.map(function (i) {
									return i.$;
								})
							};
						});
						var lintError = new Error('');
						lintError.message = 'CSSLint failure';
						lintError.stack = filesWithProblems.map(function (f) {
							return f.issues.map(function (i) {
								return 'CSSLint ' + i.severity + ': ' + i.reason + '\nat (' + f.name + ':' + i.line + ':' + i.char + ')';
							}).join('\n');
						}).join('\n');
						return done(lintError);
					});
				}
			});
		});
	});
};
