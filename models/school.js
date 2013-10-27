var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

 /**
   * School Schema
   */
var SchoolSchema = new Schema({
  _id: {
    type: Number
  },
  name: {
    type: String
  },
  preferred_name: {
    type: String
  },
  abbreviation: {
    type: String
  },
  short_name: {
    type: String
  },
  vanity_name: {
    type: String
  },
  aliases: {
    type: Array
  },
  first_letter: {
    type: String
  },
  web_address: {
    type: String
  },
  updated: {
    type: Date
  },
  address: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    state_code: {
      type: String
    },
    zip_code: {
      type: Number
    },
  },
  location: {
    type: {
      type: String
    },
    coordinates: {
      type: Array
    }
  }
});

// Ensure indexes
SchoolSchema.index({location: '2dsphere'});
SchoolSchema.index({updated: 1});

mongoose.model('School', SchoolSchema);
