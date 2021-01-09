const mongoose = require('mongoose');
const config = require('../config/config');
const {logger} = require('../middlewares');

const connectDB = async () => {
  await mongoose.connect(config.DATABASE_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (!mongoose.connection) logger.error('Error connecting Mongo DB');
  else console.log('Mongo DB connected successfully');
};

module.exports = connectDB;
