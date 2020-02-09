import nextConnect from 'next-connect';
import middleware from 'middleware';
import { isAuthorized } from 'middleware/authenticate';

const handler = nextConnect();

handler.use(middleware);
handler.use(isAuthorized);

handler.get(async (req, res) => {
	res.status(200).json({ user: req.user });
});

export default handler;
