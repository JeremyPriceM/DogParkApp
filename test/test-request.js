"use strict"

const chai = require('chai');
const chaiHttp = require('chai-http');

const { closeServer, runServer, app} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('DogPark API', function () {
    before(function () {
        return runServer();
    });
    after(function () {
        return closeServer();
    });


    describe('GET endpoint', function () {
        it('should return index.html', function () {
            return chai.request(app)
            .get('/')
            .then(function(res) {
                expect(res).to.have.status(200);
            });
        });
    });
    describe('Get endpoint', function () {
        it('should return /dogparks.html', function() {
            return chai.request(app)
            .get('/dogparks')
            .then(function(res) {
                expect(res).to.have.status(200);
            });
        });
    });
    // describe('Get endpoint', function() {
    //     it('should return /newdogparks.html', function() {
    //         return chai.request(app)
    //         .get('/newdogparks')
    //         .then(function(res) {
    //             expect(res).to.have.status(200);
    //         });
    //     });
    // });
    // describe('POST endpoint', function() {
    //     it('should POST to /dogparks.html', function() {
    //         return chai.request(app)
    //         .post('/dogparks')
    //         .then(function(res) {
    //             expect(res).to.have.status(200);
    //         });
    //     });
    // });
    // describe('Get endpoint', function(){
    //     it('should return /dogparks/id', function() {
    //         return chai.request(app)
    //         .get('/dogparks/:id')
    //         .then(function(res) {
    //             expect(res).to.have.status(200);
    //         });
    //     });
    // });

});