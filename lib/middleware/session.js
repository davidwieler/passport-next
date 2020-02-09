import passport from 'passport';
import session from 'next-session';
import connectMongo from 'connect-mongo';
import connectDB, { db } from 'middleware/mongodb';
import nextConnect from 'next-connect';
import redirect from 'micro-redirect';

import localStrategy from 'middleware/passport/local';
import gitHubStrategy from 'middleware/passport/github';

const handler = nextConnect();

handler.use(connectDB);

const MongoStore = connectMongo(session);

passport.use(localStrategy);
passport.use(gitHubStrategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

handler.use((req, res, next) => {
	// Polyfill the res.redirect method that PassportJS needs
	res.redirect = (location, status = 302) => {
		redirect(res, status, location);
	};
	next();
});

handler.use((req, res, next) => {
	return session({
		name: process.env.COOKIE_NAME,
		storePromisify: true,
		store: new MongoStore({ mongooseConnection: db })
	})(req, res, next);
});

handler.use((req, res, next) => {
	return passport.initialize()(req, res, next);
});
handler.use((req, res, next) => {
	return passport.session()(req, res, next);
});

export default handler;
