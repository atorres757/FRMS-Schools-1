var mongoose = require('mongoose');

module.exports = function(config) {
  var db = mongoose.connect(config.db)
  , school = require('./models/school') // Bootstrap Schema
  , schools = require('./controllers/schools');
  
  db.connection.on('connected', function(){
    console.log('Connected to ' + config.db);
  });

  return schools;
};
