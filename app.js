//import { error } from 'util';

/* used to spin up the express application 
which will make handling requests easier*/

const express = require('express');

//spin up the express application
const app = express();

//use morgan for logging incoming requetsin console
const morgan = require('morgan');

//body-parser to parse incoming requests
const bodyParser = require('body-parser');

//momgoose for mongodb connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://gagan:gagan@cluster0-cb0uh.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});
// mongoose.connect('mongodb://mazgagan' + process.env.MONGO_ATLAS_PW +
//     '@cluster0-shard-00-00-cb0uh.mongodb.net:27017,cluster0-shard-00-01-cb0uh.mongodb.net:27017,cluster0-shard-00-02-cb0uh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
//         uri_decode_auth: true
//     });

const productRoutes = require('./Api/routes/products');
const orderRoutes = require('./Api/routes/orders');

//an incoming request has to go through app.use
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//to add headers to all response. This will not send a response though
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.message === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

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