import { Strategy as GitHubStrategy } from 'passport-github2';
import { findUserByEmail } from 'mongodbModels/users';

// STATICALLY configure the Github strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Github API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be exposed in the request as `req.user`
// in api handlers after authentication.
const strategy = new GitHubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: process.env.GITHUB_CALLBACK_URL,
		scope: 'user:email, public_repo',
		passReqToCallback: true
	},
	async (req, accessToken, refreshToken, profile, done) => {
		const userData = {
			name: profile._json.name,
			email: profile._json.email,
			github: {
				id: profile.id,
				username: profile.username,
				avatar: profile._json.avatar_url
			}
		};

		// Find the user by email, and do an upsert.
		// Which will either return the user in the DB while updating things like name and avatar,
		// or create a new user and return the new user data.
		let user = await findUserByEmail({
			email: userData.email,
			upsert: true,
			upsertData: userData
		});

		req.session.token = accessToken;

		done(null, user);
	}
);

export default strategy;
