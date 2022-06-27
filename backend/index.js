const express = require('express');
const app = express();
const config = require('./config');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db/mongoose');

app.use(bodyParser.json());

app.use(cors());

//routes
app.use('/api/', apiRouter);


//server
app.listen(config.port, function () {
    console.log('server listen');
});