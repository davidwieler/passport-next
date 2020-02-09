import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmail, comparePassword } from 'mongodbModels/users';

const strategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	async (email, password, done) => {
		// Find the user by email, and include the password in the
		// returned data
		const user = await findUserByEmail({
			email,
			includePassword: true
		});

		// If there is no user matching the provided email,
		// just return false
		if (!user) {
			return done(null, false);
		}

		// If a user is found, we need to compare the passwords using bcrypt.
		// If there is no password stored, due to user signing up with GitHub, etc.,
		// return false as local strategy won't work without a password.

		// If there is a password, compare the provided one with the saved one.
		// If they don't match, just return false.
		if (user.password) {
			const validPassword = await comparePassword(password, user.password);

			if (validPassword) {
				console.log('test');

				const returnedUser = {
					_id: user._id,
					email
				};

				return done(null, returnedUser);
			}
		}

		return done(null, false);
	}
);

export default strategy;
