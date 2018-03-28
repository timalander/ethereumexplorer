import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import classNames from 'classnames/bind';

import { AddressItem } from './AddressItem';
import styles from './styles/AddressList.scss';
const cx = classNames.bind(styles);

export class AddressList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addresses: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const response = await axios.get('http://localhost:8080/api/addresses');
        const addressData = _.get(response, 'data.addresses', null);

        if (addressData) {
            this.setState({addresses: addressData});
        }
    }

    render() {
        return (
            <div className={cx('list')}>
                <div className={cx('tr', 'th')}>
                    <div className={cx('td', 'left')}>Address Hash</div>
                    <div className={cx('td')}>Balance</div>
                    <div className={cx('td')}>Transaction Count</div>
                </div>
                {_.map(this.state.addresses, (address) => {
                    return (
                        <AddressItem
                            addressHash={address.hash}
                            balance={address.balance}
                            transactionCount={address.transactions}
                            key={address._id}
                        />
                    );
                })}
            </div>
        );
    }
}
