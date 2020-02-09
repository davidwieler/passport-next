const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

// Load in our environment variables
require('dotenv').config();

// Load in our config that has custom resolvers for lib and middleware files
const customConfig = require('./lib/config');

// Wrap webpack using withCSS and withSCSS so we can use regular css and scss files
module.exports = withCSS(
	withSass({
		env: {
			loginFailureURL: '/login',
			loginSuccessURL: '/private'
		},
		webpack(config, options) {
			// Add env to next.
			// Using `process.browser` to determine if we're client side or server side,
			// we can use our secret keys and such, and they are still secure.
			// Environment data added here is not available client side
			config.plugins.push(new webpack.EnvironmentPlugin(process.env));

			// Add in our resolvers to Next's aliases
			// Custom aliases first, so we don't override something in Next by mistake
			config.resolve.alias = {
				...customConfig.resolvers.alias,
				...config.resolve.alias
			};

			return config;
		}
	})
);
