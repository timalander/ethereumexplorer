'use strict';

import mongoose from 'mongoose';

import { TransactionSchema } from './transaction';

const Schema = mongoose.Schema;

export const AddressSchema = new Schema({
    hash: {
        type: String,
        unique: true,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    transactions: [TransactionSchema]
});

export default mongoose.model('Address', AddressSchema);
