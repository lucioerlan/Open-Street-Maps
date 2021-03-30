const assert = require('assert');
const Tracking = require('../../src/models/StreetMap-models');

let tracking;

describe('Creating Job', () => {
  it('creates a tracking', (done) => {
    tracking = new Tracking({
      id: '9fTp63fpZsngr',
      tracking: '911970341-4',
      lat: '49.6617919',
      lon: '32.0477111',
      plate: 'WBAUC73569V525201',
    });
    tracking.save().then(() => {
      assert(!tracking.isNew);
      done();
    });
  });
});

describe('Reading Job', () => {
  it('finds Tracking with the plate of tracking', (done) => {
    Tracking.findOne({ plate: 'WBAUC73569V525201' }).then(() => {
      assert(tracking.plate === 'WBAUC73569V525201');
      done();
    });
  });
});

describe('Update Job', () => {
  it('update a tracking', (done) => {
    Tracking.findOneAndUpdate(
      { plate: 'WBAUC73569V525201' },
      { plate: '0102030405' }
    )
      .then(() => Tracking.findOne({ plate: '0102030405' }))
      .then((res) => {
        assert(res.plate === '0102030405');
        done();
      });
  });
});

describe('Tracking Delet', async () => {
  it('successful in deleting all records', (done) => {
    Tracking.deleteMany((error) => {
      if (error) throw error;
    });
    done();
  });
});
