import nextConnect from 'next-connect';
import middleware from 'middleware';
import { isAuthorized } from 'middleware/authenticate';

const handler = nextConnect();

// Use our middleware, which contains the MongoDB connection and PassportJS
handler.use(middleware);

// Use this isAuthorized middleware on any API routes that need authorization.
// If PassportJS's "isAuthenticated" returns false, anything below it will not run.

// See ./lib/middleware/authenticate.js for more information
handler.use(isAuthorized);

handler.get(async (req, res) => {
	res.status(200).json({ user: req.user });
});

export default handler;
