import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

// Our user schema.
// Password is set to select:false,
// so it won't return in any find statements by default.
const UserSchema = new Schema({
	name: String,
	email: String,
	password: { type: String, select: false },
	github: {
		id: String,
		username: String,
		avatar: String
	}
});

// Export the user model.
// On startup, the Mongoose model will be created and returned.
// Any additional times the model is required, it'll return the already created
// schema. If we don't do this, Next will error with a Mongoose error due to it
// trying to recreate the schema.
export const User = mongoose.models.User || mongoose.model('User', UserSchema);

export const findUserByEmail = async ({ email, includePassword = false, upsert = false, upsertData = {} }) => {
	let user = null;

	if (upsert) {
		user = await User.findOneAndUpdate({ email: email }, { $set: upsertData }, { upsert: true, useFindAndModify: false, new: true });
	} else {
		user = await User.findOne({ email }, { password: includePassword });
	}

	return user;
};

export const comparePassword = async (password, userPassword) => {
	const compare = await bcrypt.compare(password, userPassword);

	return compare;
};

export const createUser = async ({ email, password }) => {
	if (!email || !password) {
		return;
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const userDetails = {
		email,
		password: hash
	};

	const newUser = User(userDetails);
	const saveUser = await newUser.save();

	return saveUser;
};
