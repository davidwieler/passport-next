/**
 * Custom aliases
 * With our custom paths being required in and using them in out next.config.js file,
 * we're saved from backstepping imports like '../../../middleware/mongodb',
 * and can use the needed functionality directly like: import ConnectDB from 'middleware/mongodb'.
 */

const path = require('path');
const paths = require('./paths');

module.exports = {
	alias: {
		lib: paths.lib,
		pages: paths.pages,
		customHooks: paths.customHooks,
		middleware: paths.middleware,
		mongodbModels: paths.mongodbModels,
		components: paths.components,
		styles: paths.styles
	}
};
