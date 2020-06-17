var seeder = require('mongoose-seed');
require('dotenv').config()


// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, function() {

    // Load Mongoose models
    seeder.loadModels([
        'src/models/TrackingModel.js',

    ]);

    // Clear specified collections
    seeder.clearModels(['tracking'], function() {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(require('./SeedDatas'), function() {
            seeder.disconnect();
        });

    });
});