//import { error } from 'util';

/* used to spin up the express application 
which will make handling requests easier*/

const express = require('express');

//spin up the express application
const app = express();

const morgan = require('morgan');

const productRoutes = require('./Api/routes/products');
const orderRoutes = require('./Api/routes/orders');

//an incoming request has to go through app.use
app.use(morgan('dev'));
// incoming routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//to handle errors or handle invlaid requests.
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;