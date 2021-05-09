const Util = require('../utils/Utils');
const { GetAll, GetId, Store, Update } = require('../models/mapa-models');

const util = new Util();

/**
 * The TrackingController.
 *
 * @method index Get all tracking
 * @method show  get id tracking
 * @method store Insert tracking
 * @method update update tracking
 */

class TrackingController {
  async index(req, res) {
    try {
      const data = await GetAll();

      if (data) {
        util.setSuccess(200, data);
      } else {
        util.setError(400, 'no data!');
      }

      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.query;

      const data = await GetId(id);

      if (data) {
        util.setSuccess(200, data);
      } else {
        util.setError(400, 'no data!');
      }

      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  async store(req, res) {
    try {
      const { tracking, lat, lon, plate, } = req.body;

      const data = await Store(tracking, lat, lon, plate);

      if (data) {
        util.setSuccess(200, data);
      }

      req.io.emit('notification', data);
      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  async update(req, res) {
    try {
      const { id, tracking, lat, lon, plate } = req.body;

      const data = await Update(id, tracking, lat, lon, plate);

      if (data) {
        util.setSuccess(200, data);
      }

      req.io.emit('notification', data);
      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }
}


module.exports = TrackingController;
