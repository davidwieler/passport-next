import nextConnect from 'next-connect';
import middleware from 'middleware';
import { isAuthorized } from 'middleware/authenticate';
import { findUserByEmail } from 'mongodbModels/users';

const handler = nextConnect();

// Use our middleware, which contains the MongoDB connection and PassportJS
handler.use(middleware);

// Use this isAuthorized middleware on any API routes that need authorization.
// If PassportJS's "isAuthenticated" returns false, anything below it will not run.

// See ./lib/middleware/authenticate.js for more information
handler.use(isAuthorized);

// If the user is authenticated, get the user data from MongoDB and return it.
// In your page props, you can check for failedAuth because
// handler.use(isAuthorized) automatically returns that boolean.

// If it's not set, PassportJS authenticated correctly and you can do what ever you need
// knowing the user is logged in.
// In this example we're just going to look up the user in Mongo and return it because we
// haven't stored anything else.
handler.get(async (req, res) => {
	let user = await findUserByEmail({
		email: req.user.email
	});

	res.status(200).json({
		protectedData: {
			user
		}
	});
});

export default handler;
