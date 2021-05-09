const seeder = require('mongoose-seed');
const { join } = require('path');
const connectDB = require('../db-config');
const seedData = require('./SeedData');

(async () => {

  seeder.connect(await connectDB(), () => {
    // Load Mongoose models
    seeder.loadModels([join('src/schema/mapa-schema')]);

    seeder.clearModels(['tracking'], () => {

      seeder.populateModels(seedData, () => {
        seeder.disconnect();
      });
    });
  });
})();
