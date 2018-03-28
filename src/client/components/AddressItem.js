import React from 'React';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind';

import styles from './styles/AddressItem.scss';
const cx = classNames.bind(styles);

const ether = (wei) => wei/1000000000000000000;

export const AddressItem = ({addressHash, balance, transactionCount}) => {
    return (
        <div className={cx('tr')}>
            <Link to={`/address/${addressHash}`} className={cx('td')}>{addressHash.slice(0, 24)}</Link>
            <div className={cx('td', 'center')}>{ether(balance)}</div>
            <div className={cx('td', 'center')}>{transactionCount}</div>
        </div>
    );
};
