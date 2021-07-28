const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    continent: {
      type: String,
      required: true,
    },
    population: {
      type: Number,
      required: true,
      min: 0,
    },
    placeType: {
      type: String,
      required: true,
    },
  },

);


const PlaceModel = mongoose.model('place', placeSchema);

module.exports = PlaceModel;
