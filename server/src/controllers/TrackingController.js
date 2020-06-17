const mongoose = require('mongoose');
const Tracking = mongoose.model('tracking'); //you colletions ''
//const clientRedis = require('../redis/Redis')
require('colors');



module.exports = {
    async index(req, res) {
/*         clientRedis.get('allpersons', async(err, cache) => {
            if (cache) {
                console.log('Get Redis'.bgRed);
                res.send(cache)
            } else {
                console.log('Get Mongo'.bgGreen); */
                await Tracking.find({}, { "__v": 0, "createdAt": 0 })
                    .then((person) => {
 /*                        clientRedis.set('allpersons', JSON.stringify(person));
                        clientRedis.expire('allpersons',2); */
                        res.status(200).send(person);
                    }).catch(err => res.status(500).send(err))
/*             }
        });
 */
    },

    async show(req, res) {
        const tracking = await Tracking.findById(req.params.id)
            .catch((err) => {
                res.status(500).json({ status: 500, message: 'This id does not exist', type: 'Failure' });
                console.log(err.message.red);

            });
        return res.json(tracking);
    },



    async store(req, res) {
        const tracking = await Tracking.create(req.body)

        .then(() => {
            res.status(200).json({ status: 200, message: 'Data insert successfully', type: 'Success' });
            console.log("Data updated successfully".green);

        }).catch((err) => {
            res.status(500).json({ status: 500, message: 'Error insert data', type: 'Failure' });
            console.log(err.message.red);

        });
    },



    async update(req, res) {
        const tracking = await Tracking.findByIdAndUpdate(req.params.id, req.body)

        .then(() => {
            res.status(200).json({ status: 200, message: 'Data updated successfully', type: 'Success' });
            console.log("Data updated successfully".green);

        }).catch((err) => {
            res.status(500).json({ status: 500, message: 'Error updating data', type: 'Failure' });
            console.log(err.message.red);

        });
    },



    async destroy(req, res) {
        const tracking = await Tracking.findByIdAndRemove(req.params.id)

        .then(() => {
            res.status(200).json({ status: 200, message: 'Data successfully deleted', type: 'Success' });
            console.log("Data successfully deleted".green);

        }).catch((err) => {
            res.status(500).json({ status: 500, message: 'Error deleting data', type: 'Failure' });
            console.log(err.message.red);
        });

    }

};