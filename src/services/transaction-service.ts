"use strict";
import * as _ from "lodash"
import {APIGatewayProxyEventQueryStringParameters} from "aws-lambda/trigger/api-gateway-proxy";
import { Transaction } from "../model/transaction";
import { Aggregate } from "../model/aggregate";

// I defined queryStringParameters as optional since you're calling getAggregate without it line 26 of handler.ts
// I suppose the transactions can already come filtered out
// If it's not the case, you need to get queryStringParameters from the event post data line 26 of handler.ts
export default class TransactionService {
    /**
     * Implementation for aggregating the data based on merchant Id
     * @param transactions
     * @param queryStringParameters
     */
    getAggregate = (transactions: Array<Transaction>, queryStringParameters?: APIGatewayProxyEventQueryStringParameters): Array<Aggregate> => {

        if (_.get(queryStringParameters, 'merchantType')) {
           transactions = transactions.filter(({ merchantType }) => merchantType === queryStringParameters.merchantType);
        }

        return _(transactions).groupBy(({ merchantId }) => merchantId).map((objs, merchantId) => ({
          merchantId,
          gross: _.sumBy(objs, ({ value }) => value > 0 ? value : 0),
          net: _.sumBy(objs, 'value'),
          // Since you defined average as a number it's up to the client to format it its way
          // Or you defined it as a string directly, because if not '3.40' will become 3.4
          average: _.round(_.meanBy(objs, 'value'), 2)
        })).value();
    }
}
