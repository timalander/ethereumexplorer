'use strict';

import express from 'express';
import 'express-async-errors';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import pino from 'pino';

import addressRoutes from './routes/addresses';

const app = express();
const logger = pino({prettyPrint: true});

app.use(helmet());
app.use(bodyParser.json());

app.use('/api/addresses', addressRoutes);
app.use(express.static(path.join(__dirname + '/static')))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

// Logging and exception handling
app.use((err, req, res, next) => {
    if (err) {
        logger.error(err);
    }

    next(err);
});

export default app;
