'use strict';

import axios from 'axios';

export const getExternalAddressInfo = async (addressHash, res) => {
    const BASE_URL = 'http://api.etherscan.io/api?module=account';
    const API_KEY = '&apikey=IYVTK5K2E4D8485PMYG53YMZJ4IXNB4B3B';
    const BALANCE_ACTION = '&action=balance';
    const TX_ACTION = '&action=txlist';

    const getAddressBalancePromise = axios.get(`${BASE_URL}${BALANCE_ACTION}${API_KEY}&address=${addressHash}`);
    const getAddressTxPromise = axios.get(`${BASE_URL}${TX_ACTION}${API_KEY}&address=${addressHash}`);

    return Promise.all([getAddressBalancePromise, getAddressTxPromise]);
};
