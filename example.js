'use strict';
var NDC = require('./'),
    testData = require('./test/test-data'),
    kronos = new NDC(testData.config[0]),
    usdtravel = new NDC(testData.config[1]);

// var message = kronos.messages.AirShopping(testData.AirShopping[1]);
var message = usdtravel.messages.FlightPrice(testData.FlightPrice[0]);
require('fs').writeFileSync('/tmp/debug.xml', message.toXML(true, true));
message.request(function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log('>>>', JSON.stringify(data, null, '  '));
}, true);
