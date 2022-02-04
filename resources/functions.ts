"use strict";
export default {
    transactions: {
        handler: 'src/handlers/handler.aggregate',
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
