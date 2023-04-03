import hello from './src/functions/hello';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
	service: 'teamsheet-lambda',
	frameworkVersion: '3',
	plugins: ['serverless-plugin-typescript', 'serverless-offline', 'serverless-tscpaths'],
	provider: {
		iam: {
			role: 'arn:aws:iam::733043447271:role/lambda-vpc-role',
		},
		name: 'aws',
		runtime: 'nodejs16.x',
		region: 'eu-west-2',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
		},
		vpc: {
			securityGroupIds: ['sg-0136d60bde25c036c'],
			subnetIds: ['subnet-0f6b436955df702d7', 'subnet-05696ab3b47b0f565'],
		},
	},
	// import the function via paths
	package: { individually: true },
	custom: {
		// tscpaths: { // Doesn't seem to work when paths are used in this file prior to them being defined
		// 	libs: 'src/libs',
		// 	functions: 'src/functions',
		// },
		// esbuild: {
		// 	bundle: true,
		// 	minify: false,
		// 	sourcemap: true,
		// 	exclude: ['aws-sdk'],
		// 	target: 'node16',
		// 	define: { 'require.resolve': undefined },
		// 	platform: 'node',
		// 	concurrency: 10,
		// },
	},
	functions: { hello },
};

module.exports = serverlessConfiguration;
