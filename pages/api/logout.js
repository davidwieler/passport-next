import nextConnect from 'next-connect';
import middleware from 'middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res, next) => {
	if (req.user) {
		req.logout();
		res.redirect('/');
	} else {
		res.redirect(process.env.loginFailureURL);
	}
});

export default handler;
