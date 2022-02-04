"use strict";
// Interfaces
import {IGeneric} from "../interfaces/generic";

const validate = require('validate.js/validate');

/**
 * Validate values against constraints
 * @param values
 * @param constraints
 * @return {Promise<*>}
 */
export const validateFields = (values: IGeneric<any>, constraints: IGeneric<object>) => {

    return new Promise<void>((resolve, reject) => {
        const validation = validate(values, constraints);
        if (typeof validation === 'undefined') {
            resolve();
        } else {
           reject(new Error('Missing required fields'));
        }
    });
}
