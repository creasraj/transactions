"use strict";

export type Transaction = {
    transactionId: string;
    orderId: string;
    merchantId: string;
    merchantType: string;
    value: number;
}
