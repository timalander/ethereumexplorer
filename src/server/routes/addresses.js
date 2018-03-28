'use strict';

import express from 'express';

import {
    updateExternalAddressData,
    getAddressTransactionData,
    getAddressBalanceData,
} from '../controllers/addresses';

const router  = express.Router();

router.route('/')
    .get(getAddressBalanceData)
    .post(updateExternalAddressData);

router.route('/:addressHash')
    .get(getAddressTransactionData);

export default router;
