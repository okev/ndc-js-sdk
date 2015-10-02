'use strict';

var cabins = require('./common/cabin-types.js');

var AirShopping = function (data) {
    var now = new Date();
    return {
        PointOfSale: {
            Location: {
                CountryCode: data.countryCode,
                CityCode: data.cityCode,
            },
            RequestTime: {
                _Zone: 'EST',
                _: now.toISOString()
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
        Party: require('./common/party')(data),
        Parameters: {
            CurrCodes: {
                CurrCode: data.courrencyCode,
            }
        },
        Travelers: {
            Traveler: (
                data.travelers && data.travelers.length ?
                data.travelers.map(function (traveler) {
                    if (traveler.anonymous) {
                        return {
                            AnonymousTraveler: {
                                PTC: {
                                    _Quantity: traveler.count || 1,
                                    _: traveler.type
                                }
                            }
                        };
                    } else {
                        return {
                            RecognizedTraveler: {
                                _ObjectKey: traveler.key,
                                PTC: {
                                    _Quantity: 1,
                                    _: traveler.type
                                },
                                ResidenceCode: traveler.residenceCode,
                                Age: {
                                    Value: {
                                        _UOM: traveler.age.months ? 'Months' : 'Years',
                                        _: traveler.age.months || traveler.age.years || traveler.age
                                    }
                                },
                                Name: {
                                    Surname: traveler.name.surname,
                                    Given: traveler.name.given,
                                    Middle: traveler.name.middle
                                },
                                ProfileID: traveler.profileID,
                                Gender: traveler.gender,
                                FQTVs: (traveler.fqtvs && traveler.fqtvs.length ? {
                                    FQTV: traveler.fqtvs.map(function (fqtv) {
                                        return {
                                            AirlineID: fqtv.airlineID,
                                            Account: {
                                                Number: fqtv.accountNumber
                                            },
                                            ProgramID: fqtv.programID
                                        };
                                    })
                                } : null),
                                FOIDs: (traveler.foids && traveler.foids.length ? {
                                    FOID: traveler.foids.map(function (foid) {
                                        return {
                                            Type: {
                                                Code: foid.code,
                                                /*'PT'*/
                                                Definition: foid.definition /*'Passport'*/
                                            },
                                            ID: foid.id,
                                            Issuer: foid.issuer
                                        };
                                    })
                                } : null),
                                Contacts: {
                                    Contact: {
                                        EmailContact: traveler.contact.email
                                    }
                                },
                                Languages: (traveler.languages && traveler.languages.length ? {
                                    LanguageCode: traveler.languages
                                } : null)
                            }
                        };
                    }
                }) :
                null
            )
        },
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
                Definition: cabins[data.cabin.toUpperCase()]
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
