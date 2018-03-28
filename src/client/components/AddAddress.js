import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import classNames from 'classnames/bind';

import styles from './styles/AddAddress.scss';
const cx = classNames.bind(styles);

export class AddAddress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            loading: false,
        };
    }

    async postData(data) {
        this.setState({loading: true});

        try {
            const response = await axios.post('http://localhost:8080/api/addresses', data);
        } catch (err) {
            if (err.response.status === 422) {
                alert('Please enter a valid Ethereum address.');
            }
        } finally {
            this.setState({loading: false});
        }
    }

    handleChange(event) {
        this.setState({address: event.target.value})
    }

    handleClick() {
        const address = this.state.address
        this.postData({address});
    }

    render() {
        return (
            <div className={cx('form')}>
                <input
                    type="text"
                    name="address"
                    value={this.state.address}
                    onChange={(event) => this.handleChange(event)}
                />
                <button onClick={() => this.handleClick()} disabled={this.state.loading}>Submit</button>
                {this.state.loading && <div>Loading...</div>}
            </div>
        );
    }
}
