const express = require('express');
const app = express();
const config = require('./config');
const apiRouter = require('./routes/api');

require('./db/mongoose');

//routes
app.use('/', apiRouter)

//server
app.listen(config.port, function () {
    console.log('server listen');
});