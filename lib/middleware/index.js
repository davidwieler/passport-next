import nextConnect from 'next-connect';
import connectDB from './mongodb';
import session from './session';

const middleware = nextConnect();

middleware.use(connectDB);
middleware.use(session);

export default middleware;
