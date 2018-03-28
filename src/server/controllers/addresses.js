'use strict';

import _ from 'lodash';

import { getExternalAddressInfo } from '../services/etherscan';
import Address from '../models/address';
import Transaction from '../models/transaction';

const ether = (wei) => wei/1000000000000000000;

export const updateExternalAddressData = async (req, res) => {
    const addressHash = req.body.address;

    if(!addressHash) {
        return res.status(422).send({
            response: 'You must specify an address to update'
        });
    }

    const [balanceResponse, txResponse] = await getExternalAddressInfo(addressHash, res);
    const addressBalance = _.get(balanceResponse, 'data.result', 0);
    const txData = _.get(txResponse, 'data.result', []);

    if (!_.isArray(txData)) {
        return res.status(422).send({
            response: 'You must specify a valid Ethereum address to update'
        });
    }

    const txs = _.map(txData, (tx) => {
        return new Transaction({
            hash: tx.hash,
            value: tx.value,
            blockNumber: tx.blockNumber,
            to: tx.to,
            from: tx.from,
        });
    });

    const addressEntry = _.omit(new Address({
        hash: addressHash,
        balance: balanceResponse.data.result,
        transactions: txs,
    }).toObject(), ['_id']);

    await Address.findOneAndUpdate({hash: addressHash}, addressEntry, {upsert: true});

    return res.status(201).send({
        response: `Address data saved for address hash: ${addressHash}`
    });
};

export const getAddressTransactionData = async (req, res) => {
    const addressHash = req.params.addressHash;
    const { limit, value } = req.query;

    const addressData = await Address.findOne({hash: addressHash});
    let txData = _.get(addressData, 'transactions', []);

    if (limit) {
        txData = _.take(txData, limit);
    }
    if (value) {
        txData = _.filter(txData, (tx) => ether(tx.value) >= value);
    }

    return res.status(200).json({
        'transactions': txData,
    });
};

export const getAddressBalanceData = async (req, res) => {
    let addressData = await Address.find({});
    addressData = _.map(addressData, (address) => {
        let addressObject = address.toObject();
        addressObject.transactions = addressObject.transactions.length;
        return addressObject;
    });

    return res.status(200).json({
        'addresses': addressData,
    });
};
