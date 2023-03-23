import { DBSecret } from '@functions/hello/handler';
import { Dialect, Sequelize } from 'sequelize';

let sequelizeInstance: Sequelize = null;

async function loadSequelize(secret: DBSecret) {
	const { username, password, engine, host, port, dbInstanceIdentifier } = secret;

	const newSequelizeInstance = new Sequelize({
		database: dbInstanceIdentifier,
		username,
		password,
		host: host,
		// host: 'teamsheet-db-proxy.proxy-c3txzw57ocdq.eu-west-2.rds.amazonaws.com',
		port,
		dialect: engine as Dialect,

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
			evict: 300000,
		},
	});

	await newSequelizeInstance.authenticate();

	return newSequelizeInstance;
}

export async function getSequelizeInstance(secret: DBSecret) {
	if (!sequelizeInstance) {
		sequelizeInstance = await loadSequelize(secret);
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
