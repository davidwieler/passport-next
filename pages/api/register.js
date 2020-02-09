import nextConnect from 'next-connect';
import { createUser, findUserByEmail } from 'mongodbModels/users';

import connectDB from 'middleware/mongodb';

const handler = nextConnect();

handler.use(connectDB);

handler.post(async (req, res, next) => {
	const { email, password } = req.body;

	// Try to find existing user by email
	const userExists = await findUserByEmail({ email });

	if (userExists) {
		// User exists return with an error message
		res.status(200).json({ status: 409, failedAuth: false, redirectTo: '/login', errorMessage: 'User Exists' });
		return;
	}

	// No user exists with that email, create the user
	const user = await createUser({ email, password });

	res.status(200).json({ status: 200 });
});

export default handler;
