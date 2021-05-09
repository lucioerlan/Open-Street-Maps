const Tracking = require('../schema/mapa-schema');

const GetAll = async () => {
  return Tracking.find();
};

const GetId = async (id) => {
  if (!id) throw new Error('id not informed!');

  return Tracking.findById(id);
};

const Store = async (tracking, lat, lon, plate) => {
  const exists = await Tracking.find({ tracking });

  if (exists.length) throw new Error('existing tracking');

  return Tracking.create({
    tracking,
    lat,
    lon,
    plate,
  });
};

const Update = async (id, tracking, lat, lon, plate) => {
  if (!id) throw new Error('id not informed!');

  return Tracking.findByIdAndUpdate(
    id,
    { tracking, lat, lon, plate },
    { new: true }
  );
};

module.exports = {
  GetAll,
  GetId,
  Store,
  Update,
};
