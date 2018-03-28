import React from 'React';
import classNames from 'classnames/bind';

import styles from './styles/TransactionItem.scss';
const cx = classNames.bind(styles);

const ether = (wei) => wei/1000000000000000000;

export const TransactionItem = ({
    txHash,
    value,
    blockNumber,
    to,
    from
}) => {
    return (
        <div className={cx('tr')}>
            <div className={cx('td')}>{txHash.slice(0, 24)}</div>
            <div className={cx('td', 'center')}>{ether(value)}</div>
            <div className={cx('td', 'center')}>{blockNumber}</div>
            <div className={cx('td', 'center')}>{to.slice(0, 16)}</div>
            <div className={cx('td', 'right')}>{from.slice(0, 16)}</div>
        </div>
    );
};
