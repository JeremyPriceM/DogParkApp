"use strict"

const chai = require('chai');
const chaiHttp = require('chai-http');

const { closeServer, runServer, app} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('blog posts API', function () {
    before(function () {
        return runServer();
    });
    after(function () {
        return closeServer();
    });


    describe('GET endpoint', function () {
        it('should return home index.html', function () {
            return chai.request(app)
            .get('/')
            .then(function(res) {
                expect(res).to.have.status(200);
            });
        });
    });

});