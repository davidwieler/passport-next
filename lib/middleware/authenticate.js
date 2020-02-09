// This is our authentication middleware.
// It simply checks if PassportJS's isAuthenticated method returns false,
// and immediately returns a failed authentation response to the request.

export const isAuthorized = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).json({ status: 401, failedAuth: true, redirectTo: process.env.loginFailureURL });
	}

	next();
};
