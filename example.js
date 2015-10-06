'use strict';
var NDC = require('ndc-js-sdk');
var kronos = new NDC({
    latitude: 38.89756,
    longitude: -77.03650,
    providerName: 'KRONOS NDC GATEWAY',
    courrencyCode: 'EUR',
    countryCode: 'US',
    cityCode: 'WAS',
    language: 'en',
    endpoint: 'kronos.jrtechnologies.com',
    airline: {
        id: 'C9',
        name: 'Kronos Air',
    },
    sender: {
        id: 'C9',
        name: 'Kronos Air',
        pseudoCity: 'A4A',
        IATANumber: '98417900',
        type: 'TravelManagementCompany',
        email: 'info@carsontravels.com'
    },
    agent: {
        name: 'Carson Travels',
        id: 'ksmith212'
    },
});

var usdtravel = new NDC({
    latitude: 38.89756,
    longitude: -77.03650,
    providerName: 'BA NDC GATEWAY',
    courrencyCode: 'USD',
    countryCode: 'US',
    cityCode: 'WAS',
    language: 'en',
    endpoint: 'kronos.jrtechnologies.com',
    airline: {
        id: 'C9',
        name: 'Kronos Air',
    },
    sender: {
        id: 'test agent',
        name: 'test agent',
        owner: 'BA',
        pseudoCity: '1F8',
        IATANumber: '35200421',
        type: 'TravelAgency',
        email: 'ndc@usdtravel.com'
    },
    agent: {
        name: 'John Smith',
        id: '1980',
        role: 'Admin'
    }
});

var testReqData = {
    AirShopping: [
        /* OneWay with multiple pax */
        {
            onds: [{
                flights: [{
                    departure: {
                        date: new Date('2016-03-06'),
                        airportCode: 'CDG'
                    },
                    arrival: {
                        airportCode: 'FRA'
                    },
                    airline: usdtravel.config.sender
                }]
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
            onds: [{
                flights: [{
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
                }]
            }, {
                flights: [{
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
                }]
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
            onds: [{
                flights: [{
                    departure: {
                        date: new Date('2016-08-27'),
                        airportCode: 'ARN'
                    },
                    arrival: {
                        airportCode: 'BNC'
                    }
                }]
            }, {
                flight: [{
                    departure: {
                        date: new Date('2016-09-12'),
                        airportCode: 'BNC'
                    },
                    arrival: {
                        airportCode: 'ARN'
                    }
                }]
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
    ],
    FlightPrice: [
        /* OneWay Flight */
        {
            onds: [{
                flights: [{
                    departure: {
                        date: new Date('2016-04-06T12:45:00Z'),
                        airportCode: 'BCN'
                    },
                    arrival: {
                        date: new Date('2016-04-06T14:55:00Z'),
                        airportCode: 'FRA'
                    },
                    airline: {
                        id: 'C9',
                        name: 'Kronos Airlines'
                    },
                    number: 1127,
                    aircraftCode: '321',
                    cabin: 'C'
                }, {
                    departure: {
                        date: new Date('2016-04-06T16:15:00Z'),
                        airportCode: 'FRA'
                    },
                    arrival: {
                        date: new Date('2016-04-06T17:15:00Z'),
                        airportCode: 'PRG'
                    },
                    airline: {
                        id: 'C9',
                        name: 'Kronos Airlines'
                    },
                    number: 1398,
                    aircraftCode: '733',
                    cabin: 'C'
                }]
            }],
            participants: [{
                name: 'Travel',
                id: 'Travel'
            }],
            fareCodes: ['BRO'],
            travelers: [
                /* one anonymous adult */
                {
                    anonymous: true,
                    count: 1,
                    type: 'ADT'
                },
                /* one anonymous child */
                {
                    anonymous: true,
                    count: 1,
                    type: 'CHD'
                }
            ]
        },
        /* RoundTrip Flight */
        {
            onds: [{
                flights: [{
                    departure: {
                        date: new Date('2016-04-05T09:05:00Z'),
                        airportCode: 'ARN'
                    },
                    arrival: {
                        date: new Date('2016-04-05T11:15:00Z'),
                        airportCode: 'MUC',
                        airportName: 'Munich International'
                    },
                    opCarrier: {
                        id: 'C9',
                        name: 'Kronos Airlines'
                    },
                    airline: {
                        id: 'C9',
                        name: 'Kronos Airlines'
                    },
                    number: 2413,
                    aircraftCode: 'CR9',
                    aircraftName: 'CR9 - CANADAIR REGIONAL JET 900 JET',
                    cabin: 'M'
                }, {
                    departure: {
                        date: new Date('2016-05-06T12:40:00Z'),
                        airportCode: 'MUC',
                        airportName: 'Munich International'
                    },
                    arrival: {
                        date: new Date('2016-04-05T17:15:00Z'),
                        airportCode: 'BCN',
                        airportName: 'Barcelona Airport'
                    },
                    airline: {
                        id: 'C9',
                        name: 'Kronos Airlines'
                    },
                    number: 1812,
                    aircraftCode: '321',
                    aircraftName: '321 - AIRBUS INDUSTRIE A321 JET',
                    cabin: 'M'
                }]
            }, {
                flights: [{
                    departure: {
                        date: new Date('2016-07-12T12:45:00Z'),
                        airportCode: 'BCN',
                        airportName: 'Barcelona Airport'
                    },
                    arrival: {
                        date: new Date('2016-04-05T11:15:00Z'),
                        airportCode: 'FRA',
                        airportName: 'Frankfurt International'
                    },
                    opCarrier: {
                        id: 'C9',
                        name: 'Kronos Airlines'
                    },
                    airline: {
                        id: 'C9',
                        name: 'Kronos Airlines'
                    },
                    number: 2413,
                    aircraftCode: 'CR9',
                    aircraftName: 'CR9 - CANADAIR REGIONAL JET 900 JET',
                    cabin: 'M'
                }, {
                    departure: {
                        date: new Date('2016-05-06T12:40:00Z'),
                        airportCode: 'MUC',
                        airportName: 'Munich International'
                    },
                    arrival: {
                        date: new Date('2016-04-05T17:15:00Z'),
                        airportCode: 'BCN',
                        airportName: 'Barcelona Airport'
                    },
                    airline: {
                        id: 'C9',
                        name: 'Kronos Airlines'
                    },
                    number: 1812,
                    aircraftCode: '321',
                    aircraftName: '321 - AIRBUS INDUSTRIE A321 JET',
                    cabin: 'M'
                }]
            }],
            participants: [{
                name: 'Travel',
                id: 'Travel'
            }],
            fareCodes: ['BRO'],
            travelers: [
                /* one anonymous adult */
                {
                    anonymous: true,
                    count: 1,
                    type: 'ADT'
                },
                /* one anonymous child */
                {
                    anonymous: true,
                    count: 1,
                    type: 'CHD'
                }
            ]
        },
    ]
};

// var message = kronos.messages.AirShopping(testReqData.AirShopping[1]);
var message = usdtravel.messages.FlightPrice(testReqData.FlightPrice[1]);
require('fs').writeFileSync('/tmp/debug.xml', message.toXML(true, true));
message.request(function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log('>>>', JSON.stringify(data, null, '  '));
}, true);
