const express = require('express');
const routes = express.Router();

const TrackingController = require('../controllers/TrackingController');

//Swagger
var fs = require('fs'),
    path = require('path'),
    http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var spec = fs.readFileSync(path.join(__dirname, '../doc/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);


routes.get('/', (req, res) => res.json({
    status: 'API Working MONGODB !'
}));
routes.get('/tracking', TrackingController.index);
routes.get('/tracking/:id', TrackingController.show);
routes.post('/tracking', TrackingController.store);
routes.put('/tracking/:id', TrackingController.update);
routes.delete('/tracking/:id', TrackingController.destroy);


swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {

    // Serve the Swagger documents and Swagger UI
    routes.use(middleware.swaggerUi());


});


module.exports = routes;