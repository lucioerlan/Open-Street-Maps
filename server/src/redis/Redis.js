const redis = require('redis');

const client = redis.createClient();

module.exports = client;