"use strict";
import { Transaction } from "../model/transaction";
import { Aggregate } from "../model/aggregate";
import * as _ from "lodash"
import {APIGatewayProxyEventQueryStringParameters} from "aws-lambda/trigger/api-gateway-proxy";

export default class TransactionService {
    /**
     * Implementation for aggregating the data based on merchant Id
     * @param transactions
     * @param queryStringParameters
     */
    getAggregate = (transactions: Array<Transaction>, queryStringParameters: APIGatewayProxyEventQueryStringParameters): Array<Aggregate> => {

        if (queryStringParameters && queryStringParameters.merchantType) {
           transactions = transactions.filter((transaction) => transaction.merchantType === queryStringParameters.merchantType);
        }

        const groupedByMerchant: Array<Aggregate> = _(transactions).groupBy(transaction => transaction.merchantId).map((objs, key) => ({
                'merchantId': key,
                'gross': _.sumBy(objs.filter(obj => obj.value > 0), obj => obj.value),
                'net': _.sumBy(objs, obj => obj.value),
                'average': parseFloat(_.meanBy(objs, obj => obj.value).toFixed(2))
            })).value();

        return groupedByMerchant;
    }
}
