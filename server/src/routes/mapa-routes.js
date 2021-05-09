const router = require('express').Router();

const TrackingController = require('../controllers/mapa-controller');

const trackingController = new TrackingController();

router
  .get('/get-all-mapa', trackingController.index)
  .get('/getid-mapa', trackingController.show)
  .post('/store-mapa', trackingController.store)
  .put('/update-mapa', trackingController.update);

module.exports = router;
