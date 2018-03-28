'use strict';

import mongoose from 'mongoose';

import app from './app';

const server = app.listen(8080, () => {
    mongoose.connect('mongodb://localhost/balanc3');
    console.log('Server is listening on 8080');
});

export default server;
