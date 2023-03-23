"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const api_gateway_1 = require("@libs/api-gateway");
const lambda_1 = require("@libs/lambda");
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
async function getSecret() {
    const secret_name = 'teamsheet/db';
    const client = new client_secrets_manager_1.SecretsManagerClient({
        region: 'eu-west-2',
    });
    let response;
    try {
        response = await client.send(new client_secrets_manager_1.GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: 'AWSCURRENT',
        }));
    }
    catch (error) {
        throw error;
    }
    const secret = JSON.parse(response.SecretString);
    return secret;
}
const hello = async (event) => {
    const secret = await getSecret();
    const { username, password, engine, host, port, dbInstanceIdentifier } = secret;
    return (0, api_gateway_1.formatJSONResponse)({
        message: `Hello ${event.body.name}!
		username is: ${username}
		password is: ${password}
		engine is: ${engine}
		host is: ${host}
		port is: ${port}
		dbInstanceIdentifier is: ${dbInstanceIdentifier}`,
        event,
    });
};
exports.main = (0, lambda_1.middyfy)(hello);
//# sourceMappingURL=handler.js.map