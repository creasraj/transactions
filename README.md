<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node HTTP API on AWS

### Solutions

1. Approach implemented in this solution takes input and aggregates them after validating for constraints.
2. Other approaches include making using of redis cache. On each transaction, create an event with transaction details (on SQS), lambda would pull the event and perform the aggregation offline.

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "message": "Go Serverless v2.0! Your function executed successfully!",
  "input": {
    ...
  }
}
```

### Local development

You can invoke your function locally by using the following command:
It is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
 1. npm run install

 2. npm run dev

 3. post sample below to http://localhost:3000/dev/transactions
 
 4. To use filter on merchantType include queryString param like this - http://localhost:3000/dev/transactions?merchantType=test

```
Input String
```angular2html
[{
"transactionId": "1234",
"orderId": "12345",
"merchantId": "User1",
"merchantType": "food",
"value": 123
},
{
"transactionId": "1234",
"orderId": "12345",
"merchantId": "User1",
"merchantType": "food",
"value": 123
},  {
"transactionId": "1234",
"orderId": "12345",
"merchantId": "User2",
"merchantType": "food",
"value": 123
}]
```

Which should result in response similar to the following:

```
{
    "data": [
        {
            "merchantId": "User1",
            "gross": 246,
            "net": 246,
            "average": 123
        },
        {
            "merchantId": "User2",
            "gross": 123,
            "net": 123,
            "average": 123
        }
    ],
    "message": "",
    "status": "success"
}
```

```
serverless offline
```

## Testing

Tests are located in the `tests` folder an can be invoked by running `npm run unit-test`. These
tests will invoke the defined  actions in a wrapper, where the response can then be tested.
