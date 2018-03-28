import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import classNames from 'classnames/bind';

import { TransactionItem } from './TransactionItem';
import styles from './styles/TransactionList.scss';
const cx = classNames.bind(styles);

export class TransactionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const { addressHash } = this.props.match.params;
        const response = await axios.get(`http://localhost:8080/api/addresses/${addressHash}${this.props.location.search}`);
        const transactionData = _.get(response, 'data.transactions', null);

        if (transactionData) {
            this.setState({transactions: transactionData});
        }
    }

    render() {
        return (
            <div className={cx('list')}>
                <div className={cx('tr', 'th')}>
                    <div className={cx('td', 'left')}>TX Hash</div>
                    <div className={cx('td')}>Value</div>
                    <div className={cx('td')}>Block Number</div>
                    <div className={cx('td')}>To</div>
                    <div className={cx('td', 'right')}>From</div>
                </div>
                {_.map(this.state.transactions, (tx) => {
                    return (
                        <TransactionItem
                            txHash={tx.hash}
                            value={tx.value}
                            blockNumber={tx.blockNumber}
                            to={tx.to}
                            from={tx.from}
                            key={tx._id}
                        />
                    );
                })}
            </div>
        );
    }
}
