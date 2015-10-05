'use strict';

var common = require('./common');
var FlightPrice = function (data) {
    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data, true),
        Parameters: {
            Languages: {
                LanguageCode: data.language || 'en'
            },
            CurrCodes: {
                CurrCode: data.courrencyCode,
            },
            Pricing: {
                _AwardIncludedInd: 'false'
            }
        },
        Travelers: common.Travelers(data),
        Query: {
            OriginDestination: data.onds.map(function (ond) {
                return {
                    Flight: common.OriginDestinations(ond)
                };
            })
        },
        Preference: common.Preference(data),
        DataLists: (data.flights && data.flights.length ? {
            OriginDestinationList: {
                OriginDestination: data.flights.map(function (flight) {
                    return {
                        DepartureCode: flight.departure.airportCode,
                        ArrivalCode: flight.arrival.airportCode
                    };
                })
            }
        } : null),
        Metadata: common.Metadata(data)
    };
};

module.exports = FlightPrice;
