var CabinType = require('./cabin');
module.exports = function (data) {
    return data.flights.map(function (flight) {
        return {
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
            MarketingCarrierAirline: (data.message === 'FlightPrice' && (flight.airline || data.sender) ? null : {
                AirlineID: (flight.airline || data.sender).id,
                Name: (flight.airline || data.sender).name
            }),
            MarketingCarrier: (data.message === 'FlightPrice' && (flight.airline || data.sender) ? {
                AirlineID: (flight.airline || data.sender).id,
                Name: (flight.airline || data.sender).name,
                FlightNumber: flight.number
            } : null),
            OperatingCarrier: (data.message === 'FlightPrice' && data.opCarrier ? {
                AirlineID: data.opCarrier.id,
                Name: data.opCarrier.name,
                FlightNumber: flight.number
            } : null),
            Equipment: (flight.aircraftCode ? {
                AircraftCode: flight.aircraftCode,
                Name: flight.aircraftName
            } : null),
            CabinType: (flight.cabin ? CabinType(flight) : null),
            CalendarDates: (flight.calendar ? {
                _DaysAfter: flight.calendar.after,
                _DaysBefore: flight.calendar.before
            } : null)
        };
    });
};
