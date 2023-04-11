import { Signer } from '@aws-sdk/rds-signer';
import { Options, Sequelize } from 'sequelize';

let sequelizeInstance: Sequelize;

export type DBCredentials = Partial<Options>;

async function getToken(): Promise<string> {
	const signer = new Signer({
		hostname: 'teamsheet-db-proxy.proxy-c3txzw57ocdq.eu-west-2.rds.amazonaws.com',
		port: 5432,
		username: 'postgres',
		region: 'eu-west-2',
	});

	const token = await signer.getAuthToken();

	return token;
}

async function getDBCredentials(): Promise<DBCredentials> {
	console.log(`process.env.IS_OFFLINE: ${process.env.IS_OFFLINE}`);
	if (process.env.IS_OFFLINE) {
		return {
			database: 'teamsheet',
			username: 'postgres',
			password: '',
			host: 'localhost',
		};
	} else {
		const token = await getToken();
		return {
			database: 'postgres',
			username: 'postgres',
			password: token,
			host: 'teamsheet-db-proxy.proxy-c3txzw57ocdq.eu-west-2.rds.amazonaws.com',

			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
			},
		};
	}
}

async function loadSequelize() {
	const dbCredentials = await getDBCredentials();
	// const { username, password, engine, host, port, dbInstanceIdentifier } = await getSecret();

	// console.log(`
	// 	username is: ${username}
	// 	password is: ${password}
	// 	engine is: ${engine}
	// 	host is: ${host}
	// 	port is: ${port}
	// 	dbInstanceIdentifier is: ${dbInstanceIdentifier}`);

	const newSequelizeInstance = new Sequelize({
		...dbCredentials,
		// database: 'postgres',
		// username: 'postgres',
		// password: token,
		// password: 'S#8M4!c&5zYs',
		// host: host,
		// host: 'teamsheet-db-proxy.proxy-c3txzw57ocdq.eu-west-2.rds.amazonaws.com',
		// host: 'teamsheet-db.c3txzw57ocdq.eu-west-2.rds.amazonaws.com',
		port: 5432,
		dialect: 'postgres',

		pool: {
			/*
			 * Lambda functions process one request at a time but your code may issue multiple queries
			 * concurrently. Be wary that `sequelize` has methods that issue 2 queries concurrently
			 * (e.g. `Model.findAndCountAll()`). Using a value higher than 1 allows concurrent queries to
			 * be executed in parallel rather than serialized. Careful with executing too many queries in
			 * parallel per Lambda function execution since that can bring down your database with an
			 * excessive number of connections.
			 *
			 * Ideally you want to choose a `max` number where this holds true:
			 * max * EXPECTED_MAX_CONCURRENT_LAMBDA_INVOCATIONS < MAX_ALLOWED_DATABASE_CONNECTIONS * 0.8
			 */
			max: 2,
			/*
			 * Set this value to 0 so connection pool eviction logic eventually cleans up all connections
			 * in the event of a Lambda function timeout.
			 */
			min: 0,
			/*
			 * Set this value to 0 so connections are eligible for cleanup immediately after they're
			 * returned to the pool.
			 */
			idle: 0,
			// Choose a small enough value that fails fast if a connection takes too long to be established.
			acquire: 3000,
			/*
			 * Ensures the connection pool attempts to be cleaned up automatically on the next Lambda
			 * function invocation, if the previous invocation timed out.
			 */
			evict: 30000,
		},
	});

	await newSequelizeInstance.authenticate();

	console.log('Got here');

	return newSequelizeInstance;
}

export async function getSequelizeInstance() {
	if (!sequelizeInstance) {
		sequelizeInstance = await loadSequelize();
	} else {
		// restart connection pool to ensure connections are not re-used across invocations
		sequelizeInstance.connectionManager.initPools();

		// restore `getConnection()` if it has been overwritten by `close()`
		if (sequelizeInstance.connectionManager.hasOwnProperty('getConnection')) {
			delete sequelizeInstance.connectionManager.getConnection;
		}
	}
	return sequelizeInstance;
}
