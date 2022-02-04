"use strict";
export default {
    transactions: {
        handler: 'src/transactions/handler.aggregate',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'transactions',
                    cors: true,
                }
            }
        ]
    }
}
