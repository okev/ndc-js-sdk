'use strict';

var common = require('./common');
var FlightPrice = function (data) {
    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data, true),
        Parameters: common.Parameters(data),
        Travelers: common.Travelers(data),
        Query: {
            OriginDestination: data.onds.map(function (ond) {
                return common.OriginDestinations(ond, data, 'Flight');
            })
        },
        Preferences: common.Preferences(data),
        DataLists: {
            OriginDestinationList: data.onds.map(function (ond) {
                return {
                    OriginDestination: ond.flights.map(function (flight) {
                        return {
                            DepartureCode: flight.departure.airportCode,
                            ArrivalCode: flight.arrival.airportCode
                        };
                    })
                };
            })
        },
        Metadata: common.Metadata(data)
    };
};

module.exports = FlightPrice;
