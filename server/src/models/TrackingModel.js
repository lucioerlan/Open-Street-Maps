const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');



const ProductSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,

    },
    tracking: {
        type: String,
        required: true,

    }, 
    lat: {
        type: String,
        required: true,

    },
    lon: {
        type: String,
        required: true,

    },

    plate: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProductSchema.plugin(mongoosePaginate);
mongoose.model('tracking', ProductSchema); // You name Collections ''