"use strict";
import {APIGatewayEvent, Context} from 'aws-lambda';
import {Transaction} from "../model/transaction";
import ResponseModel from "../model/response";
import {StatusCode} from "../enums/status";
import transactionConstraints from "../constraints/transaction.json";
import {validateFields} from "../utils/util";
import TransactionService from "../services/transaction-service";

/**
 * Handler for incoming post request
 * @param event
 * @param _context
 * @return PolicyDocument
 */
export const aggregate: (event: APIGatewayEvent, _context: Context) => Promise<Promise<void>[]> = async (event: APIGatewayEvent, _context: Context): Promise<Promise<void>[]> => {
    // Initialize response variable
    let response;
    let transactions:Array<Transaction> = JSON.parse(event.body) as Array<Transaction>;
    const transactionService = new TransactionService();

    return Promise.all(
        // Validate against constraints
        transactions.map((item) => validateFields(item, transactionConstraints).catch())
    ).then(async () => {
        const aggregateData = transactionService.getAggregate(transactions);
        response = new ResponseModel(aggregateData, StatusCode.OK);
    }).catch((error) => {
        // Set Error Response
        response = (error) ? new ResponseModel({}, error.statusCode, error.message) : new ResponseModel({}, StatusCode.ERROR);
    }).then(() => {
        // Return API Response
        return response.generate()
    });
}
