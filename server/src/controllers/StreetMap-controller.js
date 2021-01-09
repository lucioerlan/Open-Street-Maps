const Util = require('../utils/Utils');
const Tracking = require('../models/StreetMap-models');

const util = new Util();

/**
 * The TrackingC API.
 *
 * @method index Get all tracking
 * @method store Insert a tracking
 */


class TrackingController {
  async index(req, res) {
    try {
      const data = await Tracking.find();

      if (data.length) {
        util.setSuccess(200, data);
      } else {
        util.setError(400, 'no data!');
      }

      return util.send(res);
    } catch (err) {
      util.setError(500, err);
      return util.send(res);
    }
  }

  async store(req, res) {
    try {
      const data = await Tracking.create(req.body);
      util.setSuccess(200, 'tracking Added!', data);

      req.io.emit('notification', data);

      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }
}

module.exports = TrackingController;
