import * as chai from 'chai';
import TransactionService from '../../src/services/transaction-service';
import { Aggregate } from "../../src/model/aggregate";
const requestMock = require('../mocks/aggregate.mock.json');
const responseMock = require('../mocks/aggregate.mock-response.json')

const expect = chai.expect;
const transactionService = new TransactionService();

describe('Transaction Service', () => {

    describe('aggregate function', () => {

        it('should aggregate the data based on request mock', () => {
            const data: Array<Aggregate> = transactionService.getAggregate(requestMock, null);
            expect(data).to.eql(responseMock);
        });

        it('should return empty for empty set', () => {
            const data: Array<Aggregate> = transactionService.getAggregate([], null);
            expect(data).to.eql([]);
        });
    })

})
