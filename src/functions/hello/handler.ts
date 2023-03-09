import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

type DBSecret = {
	username: string;
	password: string;
	engine: string;
	host: string;
	port: number;
	dbInstanceIdentifier: string;
};

async function getSecret(): Promise<DBSecret> {
	const secret_name = 'teamsheet/db';

	const client = new SecretsManagerClient({
		region: 'eu-west-2',
	});

	let response;

	try {
		response = await client.send(
			new GetSecretValueCommand({
				SecretId: secret_name,
				VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
			}),
		);
	} catch (error) {
		// For a list of exceptions thrown, see
		// https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
		throw error;
	}

	const secret: DBSecret = JSON.parse(response.SecretString);

	return secret;
}

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
	const secret = await getSecret();

	const { username, password, engine, host, port, dbInstanceIdentifier } = secret;

	return formatJSONResponse({
		message: `Hello ${event.body.name}!`,
		event,
	});

	// return formatJSONResponse({
	// 	message: `Hello ${event.body.name}!
	// 	username is: ${username}
	// 	password is: ${password}
	// 	engine is: ${engine}
	// 	host is: ${host}
	// 	port is: ${port}
	// 	dbInstanceIdentifier is: ${dbInstanceIdentifier}`,
	// 	event,
	// });
};

export const main = middyfy(hello);
