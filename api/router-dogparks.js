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
        //console.log(dogparks);
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
    //let DDP = req.params.id;
    Dogparks.findById(req.params.id)
    .then(console.log(req.params.id))
    .then (res.redirect('/dogparkID.html'), {id:req.params.id})
    // .then(function(dogpark) {
    //      res.sendFile('/dogparks.html');
    //  })

    
    // Dogparks.findById(req.params.id, function(err, dogpark) {
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.sendFile("/public/dogparkID.html")
    //     }
    // });

    

    //.then(dogpark => res.json(dogpark.serialize()))
    //.then(res.redirect('/dogparkID.html'))
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({error: "Something went Awry"});
    // });
});

router.put('/dogparks/:id', (req, res, next) => {
    Dogparks.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function() {
        Dogparks.findOne({_id: req.params.id})
        .then(function(dogpark) {
            res.send(dogpark);
        });
    });
});

router.delete("/dogparks/:id",(req, res, next) => {
    Dogparks.findByIdAndRemove({_id: req.params.id})
    .then(function(dogpark) {
        res.send(dogpark);
    });
});




 module.exports = router;
