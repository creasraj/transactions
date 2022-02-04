import * as chai from 'chai';
const aggregate = require('../../src/handlers/handler').aggregate;
const expect = chai.expect;

describe('Handler Functions', () => {

    describe('handler function', () => {
        it('the aggregate function should work', function() {
            const event = {
                body: "[ {\n" +
                    "    \"transactionId\": \"1234\",\n" +
                    "    \"orderId\": \"12345\",\n" +
                    "    \"merchantId\": \"User1\",\n" +
                    "    \"merchantType\": \"food\",\n" +
                    "    \"value\": 123\n" +
                    "}]"
            };
            const context = {};
            aggregate(event, context).then((data) =>
                expect(data).to.eql({"data":[{"merchantId":"User1","gross":123,"net":123,"average":123}],"message":"","status":"success"})
            );
        })
    })

})
