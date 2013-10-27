var mongoose = require('mongoose')
  , School = mongoose.model('School');

module.exports = {
  school: function(req, res, next) {
    School.findOne({ _id: req.params.schoolId }, function(err, school) {
      if(err) {
        res.send(500, err);
      } else if(!school) {
        res.send(404);
      } else {
        res.json(school);
      }
      return next();
    });
  },
  
  all: function(req, res, next) {
    School.find().exec(function(err, schools) {
        if(err) {
          res.send(500, err);
        } else {
          res.json(schools);
        }
        return next();
		});
  },
  
	near: function(req, res, next) {
		var METERS_IN_MILE = 1609.34
			, MILES_IN_METER = 0.000621371
			, longitude = parseFloat(req.params.lon)
			, latitude = parseFloat(req.params.lat)				
			, maxDistance = (typeof req.params.maxDistance === 'undefined') ? 
				15 : parseFloat(req.params.maxDistance);
		School.aggregate( [{
		  $geoNear: {
		    near: {	type : "Point" 
		      , coordinates: [ longitude, latitude ] }
	      , distanceField: "calculated.dist"
	      , spherical: true
        , maxDistance: METERS_IN_MILE * maxDistance
        , distanceMultiplier : MILES_IN_METER
      }
	  }], function(err, schools) {
		    if(err) {
		      res.send(500, err);
		    } else {
		      res.json(schools);
		    }
		    return next();
		});
	},
	
	upsert: function(req, res, next) {
	  var schoolId = req.body._id;
	  req.body.updated = Date.now();
	  delete req.body._id; // findOneAndUpdate() doesn't like us to play with _id

    School.findOneAndUpdate({ _id: schoolId }
        , req.body
        , {upsert: true}
        , function(err, school) {
            if(err) {
              res.send(500, err);
            } else {
              res.json(school);
            }
            return next();
      });
  },
  
  del: function(req, res, next) {
    var schoolId = req.params.schoolId;
    
    School.remove({ _id: schoolId }, function(err) {
        if(err) {
          res.send(500, err);
        } else {
          res.send(200);
        }
        return next();
    });
  }
  	
};

