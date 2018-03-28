'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TransactionSchema = new Schema({
    hash: {
        type: String,
        unique: true,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    blockNumber: {
        type: Number,
        required: true
    },
    to: {
        type: String,
        require: true
    },
    from: {
        type: String,
        require: true
    },
});

export default mongoose.model('Transaction', TransactionSchema);
