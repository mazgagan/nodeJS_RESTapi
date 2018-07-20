/* used to spin up the express application 
which will make handling requests easier*/

const express = require('express');

//spin up the express application
const app = express();

const productRoutes = require('./Api/routes/products');
const orderRoutes = require('./Api/routes/orders');
//an incoming request has to go through app.use
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;