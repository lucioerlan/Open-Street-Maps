'use strict';

const db = require('./src/connection/ConectionMongo');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const Keygrip = require('keygrip');
const cookieSession = require('cookie-session');
const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, '.log'), { flags: 'a' })



// Constants
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';


app.use(cors());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(helmet());
require('dotenv').config();
require('colors');

app.use(morgan('combined', { stream: accessLogStream }));

app.use(cookieSession({
    name: 'session',
    keys: new Keygrip(['SEKRIT2', 'SEKRIT2'], 'SHA384', 'base64'),
    maxAge: 5 * 100
}))
app.use(function (req, res, next) {
    req.session.nowInMinutes = Math.floor(Date.now() / 5e3)
    next()
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});


mongoose.connect(db.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connected to MongoDB.".green)
    }).catch(err => {
        console.log(err, 'The MongoDB was not connected.'.red)
        process.exit()
    });


requireDir('./src/models');

app.use('/', require("./src/routes/TrackingRoute"));

//Error 404
app.get('*', (req, res) => {
    res.send({ Error: 'Invalid Command, Access /docs' });
});


app.listen(PORT, HOST);
    console.log('\n' + `Visit http://localhost:${PORT}/docs`.yellow, '\n');
