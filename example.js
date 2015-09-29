var NDC = require('ndc');
var ndc = new NDC({
  courrencyCode: 'EUR',
  countryCode: 'US',
  cityCode: 'WAS',
  providerName: 'KRONOS NDC GATEWAY',
  endpoint: 'kronos.jrtechnologies.com',
  agency: {
    IATANumber: '98417900',
    name: 'Carson Travels',
    userId: 'ksmith212',
    type: 'TravelManagementCompany',
    email: 'info@carsontravels.com'
  },
  airline: {
    id: 'C9',
    name: 'Kronos Air'
  }
});

/* RoundTrip with multiple pax */
var reqData = {
  trips: [{
    departure: {
      date: new Date('2016-04-06'),
      airportCode: 'MUC'
    },
    arrival: {
      airportCode: 'LHR'
    }
  }, {
    departure: {
      date: new Date('2016-05-06'),
      airportCode: 'LHR'
    },
    arrival: {
      airportCode: 'MUC'
    }
  }],
  cabin: 'C' /* bussiness class */ ,
  travelers: [
    /* two adults */
    {
      anonymous: true,
      count: 1,
      type: 'ADT'
    },
    /* three children */
    {
      anonymous: true,
      count: 1,
      type: 'CNN'
    },
    /* John George Smith */
    {
      key: 'KS1' /* ??? */ ,
      type: 'ADT',
      residenceCode: 'US',
      age: 41,
      name: {
        given: 'John',
        middle: 'George',
        surname: 'Smith'
      },
      profileID: '123',
      gender: 'Male',
      fqtvs: [{
        airlineID: 'LH',
        accountNumber: '9922 2747 1658 222',
        programID: 'Miles and More'
      }],
      foids: [{
        code: 'PT',
        definition: 'Passport',
        id: '333444666',
        issuer: 'US'
      }],
      contact: {
        email: 'john.george@smith.com'
      },
      languages: ['en']
    }
  ]
};

// console.log('Raw XML:', ndc.AirShopping(reqData).toXML(true));
ndc.request('AirShopping', reqData, function (err, data) {
  if (err) {
    console.error(err);
  }
  console.log('>>>', JSON.stringify(data, null, '  '));
}, true);
