'use strict';
require('dotenv').config({path: '.env'});
const express = require('express');
var methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const routes = require('./api/router-dogparks');


//initialize routes
app.use(routes);

//error handling middleware
app.use(function(err, req, res, next) {
    res.status(422).send({error: err.message});
});

let server;

function runServer(DATABASE_URL, port=PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, {useNewUrlParser: true}, err => {
            if (err) {
                return reject(err);
            }
            server = app
                .listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
            })
            .on("error", err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log("closing server");
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };