'use strict';

var common = require('./common');
var SeatAvailability = function (data) {
    return {
        Document: common.Document(data),
        Party: common.Party(data, true),
        Parameters: common.Parameters(data),
        Query: {
            OriginDestination: {
                OriginDestinationReferences: data.onds.map(function (ond) {
                    return ond.key;
                }).join(' ')
            }
        },
        DataList: {
            FlightSegmentList: data.onds.map(function (ond) {
                return common.OriginDestinations(ond, data, 'FlightSegment');
            }),
            FlightList: data.flightList.map(function (flight) {
                return {
                    Flight: {
                        _FlightKey: flight.key,
                        Journey: {
                            Time: flight.journey
                        },
                        SegmentReferences: flight.segments.join(' ')
                    }
                };
            }),
            OriginDestinationList: data.ondList.map(function (ond) {
                return {
                    OriginDestination: {
                        _OriginDestinationKey: ond.key,
                        DepartureCode: ond.departureCode,
                        ArrivalCode: ond.arrivalCode,
                        FlightReferences: ond.flights.join(' '),
                    }
                };
            })
        }
    };
};

module.exports = SeatAvailability;
