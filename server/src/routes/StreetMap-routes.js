const router = require('express').Router();

const TrackingController = require('../controllers/StreetMap-controller');

const trackingController = new TrackingController();

router
  .get('/tracking', trackingController.index)
  .post('/tracking', trackingController.store);

module.exports = router;
