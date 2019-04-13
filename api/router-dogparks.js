'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Dogparks} = require('../models/models-dogparks');
router.use(express.static('public'));


router.get('/', (req, res, next) => {
    res.sendFile('index.html');
});


//get list of dogparks from DB
router.get('/dogparks', (req, res, next) => {
    Dogparks.find({})
    .then(function(dogparks) {
        res.send(dogparks);
    })
});

 router.post("/dogparks", jsonParser, (req, res, next) => {
    Dogparks.create(req.body)
    .then(function(dogpark){
        res.redirect('/dogparks.html');
    })
    .catch(next);
});

router.get("/newdogparks", (req, res) => {
    res.sendFile('/public/newdogparks.html');
});

router.get("/dogparks/:id", jsonParser, (req, res, next) => {
    Dogparks.findById(req.params.id)
    .then(console.log(req.params.id))
    .then(function(dogpark) {
        res.send(dogpark)
    })
});

router.put('/dogparks/:id', (req, res, next) => {
    Dogparks.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function() {
            res.redirect('/dogparks.html');
    });
});

router.delete("/dogparks/:id",(req, res, next) => {
    Dogparks.findByIdAndDelete({_id: req.params.id})
    .then(function() {
        res.redirect('/dogparks.html');
    });
});

 module.exports = router;
