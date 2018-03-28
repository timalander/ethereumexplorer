import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AddressList } from './components/AddressList';
import { TransactionList } from './components/TransactionList';
import { AddAddress } from './components/AddAddress';

import './components/styles/Index.scss';

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path='/' component={AddressList} />
                <Route path='/address/:addressHash' component={TransactionList} />
                <Route exact path='/add' component={AddAddress} />
            </div>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('index'));
