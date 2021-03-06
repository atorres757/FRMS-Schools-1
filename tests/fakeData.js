var schools = require('../models/school')
  , fakery = require('mongoose-fakery')
  , mongoose = require('mongoose')
  , http = require('http');
  
fakery.generator('uni_name', function() {
    var name = fakery.g.surname();
    return name() + ' University';
});

var uni_nameGen = fakery.g.uni_name();
  
fakery.fake('school', mongoose.model('School'), {
  _id: fakery.g.rndint(0, 100000),
  name: uni_nameGen(),
  preferred_name: 'fake_school',
  abbreviation: fakery.g.str(1, 3),
  short_name: '',
  vanity_name: '',
  aliases: ['', ''],
  first_letter: fakery.g.str(1, 1),
  web_address: '',
  address: {
    address: '',
    city: '',
    state: '',
    state_code: fakery.g.str(2, 2),
    zip_code: fakery.g.rndint(10000, 99999),
  },
  location: {
    type: 'Point',
    coordinates: [fakery.g.rndint(-120, -70), fakery.g.rndint(30, 50)]
  }
});
var options = { host: 'localhost'
      , path: '/schools'
        , headers: {'Content-Type': 'application/json'}
        , port: '4001'
        , method: 'PUT'
      };

for(var i = 0; i < 5000; i++) {
  var fake = fakery.make('school')
    , fakeStr = JSON.stringify(fake);

  console.log('Inserting:' + fakeStr);
  var req = http.request(options, function(response) {
    var str = '';
    response.on('data', function (chunk) {
      str += chunk;
    });
  
    response.on('end', function () {
      console.log(str);
    });
  });
  req.write(fakeStr);
  req.end();
}
