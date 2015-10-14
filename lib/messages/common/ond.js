var CabinType = require('./cabin');
module.exports = function OriginDestinations(data, root, arrayRoot) {
    var result = {};
    result[arrayRoot] = data.flights.map(function (flight) {
        return {
            _SegmentKey: flight.segmentKey,
            Departure: {
                AirportCode: flight.departure.airportCode,
                AirportName: flight.departure.airportName,
                Date: flight.departure.date ? flight.departure.date.toISOString().replace(/T.*/, '') : null,
                Time: flight.departure.date ? flight.departure.date.toISOString().replace(/^.*T(.....).*/, '$1') : null
            },
            Arrival: {
                AirportCode: flight.arrival.airportCode,
                AirportName: flight.arrival.airportName,
                Date: flight.arrival.date ? flight.arrival.date.toISOString().replace(/T.*/, '') : null,
                Time: flight.arrival.date ? flight.arrival.date.toISOString().replace(/^.*T(.....).*/, '$1') : null
            },
            MarketingCarrierAirline: ((['SeatAvailability', 'ItinReshop', 'FlightPrice'].indexOf(root.message) > -1) && (flight.airline || root.sender) ? null : {
                AirlineID: (flight.airline || root.sender).id,
                Name: (flight.airline || root.sender).name
            }),
            MarketingCarrier: ((['SeatAvailability', 'ItinReshop', 'FlightPrice'].indexOf(root.message) > -1) && (flight.airline || root.sender) ? {
                AirlineID: (flight.airline || root.sender).id,
                Name: (flight.airline || root.sender).name,
                FlightNumber: flight.number
            } : null),
            OperatingCarrier: ((['SeatAvailability', 'FlightPrice'].indexOf(root.message) > -1) && root.opCarrier ? {
                AirlineID: root.opCarrier.id,
                Name: root.opCarrier.name,
                FlightNumber: flight.number
            } : null),
            Equipment: (flight.aircraftCode ? {
                AircraftCode: flight.aircraftCode,
                Name: flight.aircraftName
            } : null),
            ClassOfService: (flight.classOfService ? {
                Code: flight.classOfService
            } : null),
            FlightDetail: (flight.detail ? {
                FlightDuration: {
                    Value: flight.detail
                }
            } : null),
            CabinType: (flight.cabin ? CabinType(flight) : null),
            CalendarDates: (flight.calendar ? {
                _DaysAfter: flight.calendar.after,
                _DaysBefore: flight.calendar.before
            } : null)
        };
    });
    return result;
};
