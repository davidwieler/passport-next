import nextConnect from 'next-connect';
import passport from 'passport';
import middleware from 'middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res, next) => {
	const { provider } = req.query;

	passport.authenticate(provider, {
		failureRedirect: process.env.loginFailureURL,
		successRedirect: process.env.loginSuccessURL
	})(req, res, next);
});

export default handler;
