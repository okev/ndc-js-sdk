var NDC = require('ndc-js-sdk');
var ndc = new NDC({
    latitude: 38.89756,
    longitude: -77.03650,
    providerName: 'KRONOS NDC GATEWAY',
    courrencyCode: 'EUR',
    countryCode: 'US',
    cityCode: 'WAS',
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

var reqData = [
    /* RoundTrip with multiple pax */
    {
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
        cabin: 'C',
        travelers: [
            /* two anonymous adults */
            {
                anonymous: true,
                count: 2,
                type: 'ADT'
            },
            /* three anonymous children */
            {
                anonymous: true,
                count: 3,
                type: 'CNN'
            },
            /* One identified passanger */
            {
                key: 'KS1',
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
    },
    /* OneWay with multiple pax */
    {
        trips: [{
            departure: {
                date: new Date('2016-03-06'),
                airportCode: 'CDG'
            },
            arrival: {
                airportCode: 'FRA'
            }
        }],
        cabin: 'C',
        travelers: [
            /* two anonymous adults */
            {
                anonymous: true,
                count: 2,
                type: 'ADT'
            },
            /* 1 anonymous children */
            {
                anonymous: true,
                count: 1,
                type: 'CNN'
            },
            /* 1 anonymous infant */
            {
                anonymous: true,
                count: 1,
                type: 'INF'
            }
        ]
    },
    /* RoundTrip with Calendar - Direct Flight */
    {
        trips: [{
            departure: {
                date: new Date('2016-02-10'),
                airportCode: 'FRA'
            },
            arrival: {
                airportCode: 'CDG'
            },
            calendar: {
                before: 3,
                after: 3
            }
        }, {
            departure: {
                date: new Date('2016-03-06'),
                airportCode: 'CDG'
            },
            arrival: {
                airportCode: 'FRA'
            },
            calendar: {
                before: 2,
                after: 2
            }
        }],
        cabin: 'M',
        travelers: [
            /* one anonymous adult */
            {
                anonymous: true,
                count: 1,
                type: 'ADT'
            }
        ]
    },
    /* RoundTrip with all cabin */
    {
        trips: [{
            departure: {
                date: new Date('2016-08-27'),
                airportCode: 'ARN'
            },
            arrival: {
                airportCode: 'BNC'
            }
        }, {
            departure: {
                date: new Date('2016-09-12'),
                airportCode: 'BNC'
            },
            arrival: {
                airportCode: 'ARN'
            }
        }],
        travelers: [
            /* one anonymous adult */
            {
                anonymous: true,
                count: 1,
                type: 'ADT'
            }
        ]
    }
];

/*
var message = ndc.messages.AirShopping(reqData[1]);
require('fs').writeFileSync('/tmp/debug.xml', message.toXML(true, true));
message.request(function (err, data) {
*/
ndc.request('AirShopping', reqData[0], function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log('>>>', JSON.stringify(data, null, '  '));
}, true);
