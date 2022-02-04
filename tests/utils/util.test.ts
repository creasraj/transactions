import * as chai from 'chai';
import { validateFields } from '../../src/utils/util';
const expect = chai.expect;

describe('Util Functions', () => {

    describe('validateFields function', () => {
        const mockData = {
            name: "Test"
        }
        const constraints = {
            "name": {
                "presence": {
                    "allowEmpty": false
                },
                "type": "string"
            }
        };
        it('should resolve if there are no validation errors', () => {
            validateFields(mockData, constraints)
                .then(() => {
                    expect(true).to.eql(true);
                })
                .catch(() => {
                    expect(true).to.eql(false);
                });
        });
        it('should return a response containing validation errors if the data provided is incorrect', (done) => {
            // @ts-ignore
            mockData.name = 123;
            validateFields(mockData, constraints)
                .then(() => {
                    expect(true).to.eql(false);
                    done();
                })
                .catch(() => {
                    expect(true).to.eql(true);
                    done();
                });
        });
    })

})
