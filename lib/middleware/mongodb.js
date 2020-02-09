import mongoose from 'mongoose';

export const db = mongoose.connection;

export const disconnect = () => mongoose.connection.close();

export default async (req, res, next) => {
	if (mongoose.connections[0].readyState) {
		return next();
	}

	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('Connected to Mongo DB Server');
	} catch (error) {
		console.error('MONGODB ERROR: ', error);
		process.exit();
	}

	mongoose.connection.on('error', (error) => {
		console.error('MONGODB ERROR: ', error);
	});

	next();
};
