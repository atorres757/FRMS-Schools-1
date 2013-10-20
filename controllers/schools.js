var mongoose = require('mongoose')
  , School = mongoose.model('School');

module.exports = {
	all: function(req, res) {
		School.find().exec(function(err, ret) {
			if(err) {
     	 		return res.send(500, err);
    		}

    		return res.json(ret);
		});
	},
	near: function(req, res) {
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
					, distanceField: "dist.calculated"
					, spherical: true
					, maxDistance: METERS_IN_MILE * maxDistance
					, distanceMultiplier : MILES_IN_METER
           		}
           	}], function(err, docs) {
				if(err) {
     	 			return res.send(500, err);
    			}
    			return res.json(docs);
    		});
	}
};