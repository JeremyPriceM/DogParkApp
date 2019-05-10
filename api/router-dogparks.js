'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Dogparks} = require('../models/models-dogparks');
router.use(express.static('public'));
const jwt = require('jsonwebtoken');
const {localStrategy, jwtStrategy} = require('./strategies')
const config = require('../config');
const passport = require('passport');
const {User} = require('../models/users');
const {checkToken} = require('./middleware.js');


const createAuthToken = function(user) {
    return jwt.sign({user}, config.JWT_SECRET, {
      subject: user.username,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256'
    });
};
  
passport.use(localStrategy);
passport.use(jwtStrategy);
  
const localAuth = passport.authenticate('local', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false});


////////////// AUTH ROUTES /////////////////////////////////////////
router.get('/login', (req,res) => {
    res.sendFile('/public/login.html');
});

router.post('/login', localAuth, (req, res) => {
    const authToken = createAuthToken(req.user.serialize());
    res.cookie('authToken', authToken);
    res.redirect("/dogparks.html");
});

router.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie('authToken');
    res.redirect('index.html');
});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({authToken});
});

/////////////// DOGPARK ROUTES ///////////////////////////////////

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
    console.log(req);
    Dogparks.create(req.body)
    .then(function(dogpark){
        res.redirect('/dogparks.html');
    })
    .catch(next);
});

router.get("/newdogparks", (req, res) => {
    res.sendFile('/public/newdogparks.html');
});

router.get("/dogparks/:id", jsonParser, checkToken, (req, res, next) => {
    Dogparks.findById(req.params.id)
    .then(function(dogpark) {
        res.send(dogpark)
    })
});

router.put('/dogparks/:id', checkToken, (req, res, next) => {
    Dogparks.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function() {
            res.redirect('/dogparks.html');
    });
});

router.delete("/dogparks/:id", (req, res, next) => {
    Dogparks.findByIdAndDelete({_id: req.params.id})
    .then(function() {
        res.redirect('/dogparks.html');
    });
});

////////// USER ROUTES /////////////////////////

router.get('/signup', (req, res) => {
    res.sendFile('/public/signup.html');
});

router.post('/signup', jsonParser, (req, res) => {
    const requiredFields = ['username', 'password'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if (missingField) {
        return res.status(422).json({
          code: 422,
          reason: 'ValidationError',
          message: 'Missing field',
          location: missingField
        });
      }
    
      const stringFields = ['username', 'password'];
      const nonStringField = stringFields.find(
        field => field in req.body && typeof req.body[field] !== 'string'
      );
    
    if (nonStringField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: expected string',
            location: nonStringField
        });
    }
    const explicityTrimmedFields = ['username', 'password'];
    const nonTrimmedField = explicityTrimmedFields.find(
        field => req.body[field].trim() !== req.body[field]
    );

    if (nonTrimmedField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Cannot start or end with whitespace',
            location: nonTrimmedField
        });
    }

    const sizedFields = {
        username: {
            min: 1
        },
        password: {
            min: 10,
      // bcrypt truncates after 72 characters, so let's not give the illusion
      // of security by storing extra (unused) info
            max: 72
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(
        field =>
            'min' in sizedFields[field] &&
                req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(
        field =>
            'max' in sizedFields[field] &&
                req.body[field].trim().length > sizedFields[field].max
    );

    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField
            ? `Must be at least ${sizedFields[tooSmallField]
            .min} characters long`
            : `Must be at most ${sizedFields[tooLargeField]
            .max} characters long`,
            location: tooSmallField || tooLargeField
        });
    }

    let {username, password} = req.body;
  // Username and password come in pre-trimmed, otherwise we throw an error
  // before this

    return User.find({username})
        .count()
        .then(count => {
            if (count > 0) {
        // There is an existing user with the same username
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username already taken',
                    location: 'username'
                });
            }
      // If there is no existing user, hash the password
            return User.hashPassword(password);
        })
        .then(hash => {
            return User.create({
                username,
                password: hash
            });
        })
        .then(user => {
            return res.status(201).json(user.serialize());
        })
        .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
            if (err.reason === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({code: 500, message: 'Internal server error'});
        });
});

 module.exports = router;
