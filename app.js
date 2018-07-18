/* used to spin up the express application 
which will make handling requests easier*/

const express = require('express');

//spin up the express application
const app = express();

//an incoming request has to go through app.use
app.use((req, res, next) => {
    res.status(200).json({
        message: "It works!"
    });
});

module.exports = app;