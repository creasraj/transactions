import type { AWS } from '@serverless/typescript';
// Functions
import functions from './resources/functions';

const serverlessConfiguration: AWS = {
    service: 'aws-nodejs-typescript',
    frameworkVersion: '3',
    provider: {
        name: 'aws',
        stage: 'dev',
        region: 'us-west-2',
        runtime: 'nodejs14.x',
        apiGateway: {
           restApiId: '${self:custom.config.awsAccountProps.gateway.apiId}',
            restApiRootResourceId: '${self:custom.config.awsAccountProps.gateway.rootResourceId}',
            metrics: true,
        },
        cfnRole: 'arn:aws:iam::${aws:accountId}:role/AdskCfnAdministratorAccessExecutionRole'
    },
    custom: {
        config: '${file(environments/${self:provider.stage}.json):${self:provider.region}}',
        logRetentionInDays: 14
    },
    plugins: [
        'serverless-bundle',
        'serverless-offline',
        'serverless-dotenv-plugin'
    ],
    package: {
        individually: true,
    },
    functions
}

module.exports = serverlessConfiguration;
