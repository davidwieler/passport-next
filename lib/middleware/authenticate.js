import nextConnect from 'next-connect';

export const isAuthorized = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).json({ status: 401, failedAuth: true, redirectTo: process.env.loginFailureURL });
	}

	next();
};
