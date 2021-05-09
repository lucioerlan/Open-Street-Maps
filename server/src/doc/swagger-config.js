const express = require('express');

const router = express.Router();
const { readFileSync } = require('fs');
const { join } = require('path');
const { serve, setup } = require('swagger-ui-express');
const { load } = require('js-yaml');

const swaggerDocument = readFileSync(
  join(__dirname, '../doc/swagger.yaml'),
  'utf8'
);

const swaggerData = load(swaggerDocument);

// api documentation
router.use('/docs', serve, setup(swaggerData));

module.exports = router;
