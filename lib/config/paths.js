/**
 * Custom Paths
 * This file was created to resolve paths without our app,
 * which saves us from backstepping imports like '../../../middleware/mongodb'.
 *
 * With this file we can require it in our resolvers.js file,
 * and use the needed files directly like: import ConnectDB from 'middleware/mongodb'.
 *
 * While it's used for webpack aliasing, we can also reference this file directly if needed,
 * and use the paths as required.
 */

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(path.join(__dirname, '../../'));

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
	lib: resolveApp('lib'),
	styles: resolveApp('lib/styles'),
	customHooks: resolveApp('lib/custom-hooks'),
	middleware: resolveApp('lib/middleware'),
	mongodbModels: resolveApp('lib/mongodb-models'),
	components: resolveApp('components')
};

module.exports = paths;
