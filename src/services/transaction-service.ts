"use strict";
import { Transaction } from "../model/transaction";
import { Aggregate } from "../model/aggregate";
import * as _ from "lodash"

export default class TransactionService {
    /**
     * Implementation for aggregating the data based on merchant Id
     * @param transactions
     */
    getAggregate = (transactions: Array<Transaction>): any => {
        const groupedByMerchant: Array<Aggregate> = _(transactions).groupBy(transaction => transaction.merchantId).map((objs, key) => ({
                'merchantId': key,
                'gross': _.sumBy(objs.filter(obj => obj.value > 0), obj => obj.value),
                'net': _.sumBy(objs, obj => obj.value),
                'average': _.meanBy(objs, obj => obj.value)
            })).value();
        return groupedByMerchant;
    }
}
