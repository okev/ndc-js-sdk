'use strict';

var common = require('./common');

var AirShopping = function (data) {
    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data),
        Parameters: {
            CurrCodes: {
                CurrCode: data.courrencyCode,
            }
        },
        Travelers: common.Travelers(data),
        CoreQuery: {
            OriginDestinations: {
                OriginDestination: data.trips.map(function (trip) {
                    return {
                        Departure: {
                            AirportCode: trip.departure.airportCode,
                            Date: trip.departure.date.toISOString().replace(/T.*/, ''),
                        },
                        Arrival: {
                            AirportCode: trip.arrival.airportCode,
                        },
                        MarketingCarrierAirline: {
                            AirlineID: (trip.airline || data.airline).id,
                            Name: (trip.airline || data.airline).name,
                        },
                        CalendarDates: (trip.calendar ? {
                            _DaysAfter: trip.calendar.after,
                            _DaysBefore: trip.calendar.before
                        } : null)
                    };
                })
            }
        },
        Preference: {
            AirlinePreferences: {
                Airline: {
                    AirlineID: data.airline.id,
                }
            }
        },
        CabinPreferences: (data.cabin ? {
            CabinType: {
                Code: data.cabin.toUpperCase(),
                Definition: common.Cabins[data.cabin.toUpperCase()]
            }
        } : null),
        Metadata: {
            Other: {
                OtherMetadata: {
                    CurrencyMetadatas: {
                        CurrencyMetadata: [{
                            _MetadataKey: data.courrencyCode || 'EUR',
                            Decimals: 2
                        }]
                    }
                }
            }
        }
    };
};

module.exports = AirShopping;
