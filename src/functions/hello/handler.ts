import { getSequelizeInstance } from '../../db/db';
import { ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const test = await getSequelizeInstance();
	test.connectionManager.close();

	// return formatJSONResponse({
	// 	message: `Hello ${event.body.name}!`,
	// 	event,
	// });

	return formatJSONResponse({
		message: `Hello ${event.body.name}!`,
		event,
	});
};

export const main = middyfy(hello);
