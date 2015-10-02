var NDC = require('ndc');
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
        /* two anonymous adults */
        {
            anonymous: true,
            count: 2,
            typthe: 'ADT'
        },
        /* three anonymous children */
        {
            anonymous: true,
            count: 3,
            typthe: 'CNN'
        },
        /* One identified passanger */
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

/*
var message = ndc.messages.AirShopping(reqData);
require('fs').writeFileSync('/tmp/debug.xml', message.toXML(true, true));
message.request(function (err, data) {
*/
ndc.request('AirShopping', reqData, function (err, data) {
    if (err) {
        console.error(err);
    }
    console.log('>>>', JSON.stringify(data, null, '  '));
}, true);
