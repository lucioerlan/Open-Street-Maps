const mongoose = require('mongoose');

const { URL } = require('../fixtures/index.test');

describe('Connection MongoDb', () => {
  it('If successful in connect MongoDB', (done) => {
    mongoose.connect(URL, (error) => {
      done(error);
    });
  });
});
