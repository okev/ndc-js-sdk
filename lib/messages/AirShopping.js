'use strict';

var AirShopping = function (data) {
    var now = data._TimeStamp;
    return {
        PointOfSale: {
            Location: {
                CountryCode: data.countryCode,
                CityCode: data.cityCode,
            },
            RequestTime: {
                _Zone: 'UTC',
                _: now
            },
            TouchPoint: {
                Device: {
                    Code: '2',
                    Definition: 'Web Browser',
                    Position: {
                        Latitude: data.latitude,
                        Longitude: data.longitude,
                        NAC: '8KD7V PGGM0',
                    }
                },
                Event: {
                    Code: '9',
                    Definition: 'Shop',
                }
            }
        },
        Document: {
            Name: data.providerName,
            ReferenceVersion: '1.0',
        },
        Party: {
            Sender: {
                ORA_Sender: {
                    AirlineID: data.airline.id,
                    Name: data.airline.name,
                    AgentUser: {
                        Name: data.agency.name,
                        Type: data.agency.type,
                        Contacts: [{
                            EmailContact: {
                                Address: data.agency.email,
                            }
                        }],
                        PseudoCity: 'A4A',
                        IATA_Number: data.agency.IATANumber,
                        AgentUserID: data.agency.userId,
                    }
                }
            }
        },
        Parameters: {
            CurrCodes: {
                CurrCode: data.courrencyCode,
            }
        },
        Travelers: [{
            AnonymousTraveler: {
                PTC: {
                    _Quantity: '1',
                    _: 'ADT'
                },
            }
        }],
        CoreQuery: {
            OriginDestinations: [{
                Departure: {
                    AirportCode: data.departure.airportCode,
                    Date: data.departure.date.toISOString().replace(/T.*/, ''),
                },
                Arrival: {
                    AirportCode: data.arrival.airportCode,
                },
                MarketingCarrierAirline: {
                    AirlineID: data.airline.id,
                    Name: data.airline.name,
                }
            }]
        },
        Preference: {
            AirlinePreferences: {
                Airline: {
                    AirlineID: data.airline.id,
                }
            }
        },
        Metadata: {
            Other: {
                OtherMetadata: {
                    CurrencyMetadatas: [{
                        _MetadataKey: data.courrencyCode || 'EUR',
                        '$': {
                            Decimals: 2,
                        }
                    }]
                }
            }
        }
    };
};

module.exports = AirShopping;