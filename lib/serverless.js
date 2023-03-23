"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = __importDefault(require("@functions/hello"));
const serverlessConfiguration = {
    service: 'teamsheet-lambda',
    frameworkVersion: '3',
    plugins: ['serverless-plugin-typescript', 'serverless-esbuild', 'serverless-offline'],
    provider: {
        iam: {
            role: 'arn:aws:iam::733043447271:role/lambda-vpc-role',
        },
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'eu-west-2',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
    },
    functions: { hello: hello_1.default },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
    },
};
module.exports = serverlessConfiguration;
//# sourceMappingURL=serverless.js.map