import { User } from '../../db/models/user';
import { getSequelizeInstance } from '../../db/db';
import { ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const sequelizeInstance = await getSequelizeInstance();

	const users = await User.findAll({ include: 'matches' });

	users.map(async (user) => {
		console.log(`My name is ${user.firstName} ${user.lastName}`);
		console.log(user.matches);
		// await user;
	});

	sequelizeInstance.connectionManager.close();

	return formatJSONResponse({
		message: `Hello ${event.body.name}!`,
		event,
	});
};

export const main = middyfy(hello);
