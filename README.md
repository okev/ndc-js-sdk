# NDC client

A Node.js client wrapper for IATA's NDC API.

## Installation

Use npm to install from repo

    npm install https://github.com/iata-ndc/ndc-js-sdk.git --save

## Usage

Have a config ready:

```json
{
  "courrencyCode": "USD",
  "countryCode": "US",
  "cityCode": "NYC",
  "providerName": "THISNTHAT NDC GATEWAY",
  "endpoint": "http://thisnthat.example.com/ndcapi",
  "agency": {
    "IATANumber": "0000XXXX",
    "name": "ThisNThat Agency",
    "userId": "developer.test",
    "type": "TravelManagementCompany",
    "email": "info@thisnthat.example.com"
  },
  "airline": {
    "id": "XX",
    "name": "ThisNThat Air"
  }
}
```

And then make a request.

```javascript
var NDC = require('ndc');
var ndc = new NDC(require('./config.json'));
var reqData = {
    departure: {
        date: new Date('2016-01-01'),
        airportCode: 'JFK'
    },
    arrival: {
        airportCode: 'AILA'
    }
};

// Direct request
ndc.request('AirShopping', reqData, function (err, response) {
    console.log(response);
});
```

Or if you need to work with message body:

```javascript
var message = ndc.messages.AirShopping(reqData);

// check JSON message.
console.log(message.toJSON());
// check pretty XML code.
console.log(message.toXML(true));
// forced XML body
message.forceBody(message.toXML().replace(/thisString/g, 'thatString'))

message.request(function (err, response) {
    console.log(response); 
});
```