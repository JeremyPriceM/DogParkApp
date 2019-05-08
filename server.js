'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




const {PORT, DATABASE_URL} = require('./config');
const routes = require('./api/router-dogparks');


//initialize routes
app.use(routes);

//error handling middleware
// app.use(function(err, req, res, next) {
//     res.status(422).send({error: err.message});
// });

let server;

function runServer(DatabaseUrl, port=PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DatabaseUrl, {useNewUrlParser:true}, err => {
            console.log(DatabaseUrl);
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
    console.log(DATABASE_URL);
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };