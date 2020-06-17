const request = require('supertest');
const app = require('../server');

describe('GET /tracking', function () {
    it('respond with json containing a list of all tracking', function (done) {
        request(app)
            .get('/tracking')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
