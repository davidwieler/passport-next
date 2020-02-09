import passport from 'passport';
import session from 'next-session';
import connectMongo from 'connect-mongo';
import connectDB, { db } from 'middleware/mongodb';
import nextConnect from 'next-connect';
import redirect from 'micro-redirect';

import localStrategy from 'middleware/passport/local';
import gitHubStrategy from 'middleware/passport/github';

const handler = nextConnect();

// Initialize MongoDB Connection
handler.use(connectDB);

// Our Passport Strategies
// Add additional strats here
passport.use(localStrategy);
passport.use(gitHubStrategy);

// The PassportJS Serializers
// Customize as needed
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

handler.use((req, res, next) => {
	// Polyfill the res.redirect method that PassportJS needs
	res.redirect = (location, status = 302) => {
		redirect(res, status, location);
	};
	next();
});

// The Cookie Settings and Session Store
handler.use((req, res, next) => {
	const MongoStore = connectMongo(session);

	return session({
		name: process.env.COOKIE_NAME,
		storePromisify: true,
		store: new MongoStore({ mongooseConnection: db })
	})(req, res, next);
});

// Initialize PassportJS
handler.use((req, res, next) => {
	return passport.initialize()(req, res, next);
});

// Initialize the Session
handler.use((req, res, next) => {
	return passport.session()(req, res, next);
});

export default handler;
