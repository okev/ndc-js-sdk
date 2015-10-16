'use strict';

var common = require('./common');
var OrderRetrieve = function (data) {
    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data, true),
        Query: {
            Reshop: {
                Actions: {
                    ActionType: 'Create',
                    OrderID: {
                        _Owner: 'C9',
                        _: 'L9A821'
                    },
                    OrderItems: {
                        OrderItem: {
                            FlightItem: {
                                OriginDestination: data.onds.map(function (ond) {
                                    return common.OriginDestinations(ond, data, 'Flight');
                                })
                            }
                        }
                    },
                    Passengers: {
                        Passenger: {
                            $: {
                                ObjectKey: 'PAX2'
                            },
                            PTC: {
                                _: 'CHD',
                                $: {
                                    Quantity: '1'
                                }
                            },
                            Name: {
                                Surname: 'Smith',
                                Given: 'Johnny'
                            },
                            Gender: 'Male'
                        }
                    },
                    Preferences: {
                        AirlinePreferences: {
                            Airline: {
                                AirlineID: 'C9'
                            }
                        },
                        FarePreferences: {
                            FareCodes: {
                                Code: [{
                                    Code: 'EFR'
                                }, {
                                    Code: 'EFR'
                                }]
                            }
                        }
                    }
                }
            }
        },
        DataList: {
            RecognizedTravelerList: {
                RecognizedTraveler: {
                    $: {
                        ObjectKey: 'PAX1'
                    },
                    PTC: {
                        _: 'ADT',
                        $: {
                            Quantity: '1'
                        }
                    },
                    ResidenceCode: 'US',
                    Age: {
                        BirthDate: '1989-09-09'
                    },
                    Name: {
                        Surname: 'Yadav',
                        Given: 'Mithalesh',
                        Middle: 'Ignatius'
                    },
                    ProfileID: '101377609630461',
                    Contacts: {
                        Contact: [{
                            AddressContact: {
                                Street: '22 Main Street',
                                PostalCode: '14201',
                                CountryCode: 'DE'
                            }
                        }, {
                            EmailContact: {
                                Address: 'mithalesh@jrtechnologies.com'
                            }
                        }, {
                            PhoneContact: {
                                Application: 'Emergency',
                                Number: '9867236088'
                            }
                        }]
                    }
                }
            },
            FlightSegmentList: {
                FlightSegment: [{
                    $: {
                        SegmentKey: 'SEG1'
                    },
                    Departure: {
                        AirportCode: 'ARN',
                        Date: '2016-01-30',
                        Time: '18:35'
                    },
                    Arrival: {
                        AirportCode: 'FRA',
                        Date: '2016-01-30',
                        Time: '20:45',
                        AirportName: 'Frankfurt International'
                    },
                    MarketingCarrier: {
                        AirlineID: 'C9',
                        Name: 'Kronos Air',
                        FlightNumber: '805'
                    },
                    OperatingCarrier: {
                        AirlineID: 'C9',
                        Name: 'Kronos Air',
                        FlightNumber: '805'
                    },
                    Equipment: {
                        AircraftCode: '319',
                        Name: '319 - AIRBUS INDUSTRIE A319 JET'
                    },
                    FlightDetail: {
                        FlightDuration: {
                            Value: 'PT2H10M'
                        }
                    }
                }, {
                    $: {
                        SegmentKey: 'SEG2'
                    },
                    Departure: {
                        AirportCode: 'FRA',
                        Date: '2016-01-30',
                        Time: '21:15',
                        AirportName: 'Frankfurt International'
                    },
                    Arrival: {
                        AirportCode: 'RIX',
                        Date: '2016-01-31',
                        Time: '20:00',
                        AirportName: 'Riga International'
                    },
                    MarketingCarrier: {
                        AirlineID: 'C9',
                        Name: 'Kronos Air',
                        FlightNumber: '892'
                    },
                    OperatingCarrier: {
                        AirlineID: 'C9',
                        Name: 'Kronos Air',
                        FlightNumber: '892'
                    },
                    Equipment: {
                        AircraftCode: '320',
                        Name: '320 - AIRBUS INDUSTRIE A320-100/200 JET'
                    },
                    FlightDetail: {
                        FlightDuration: {
                            Value: 'PT22H45M'
                        }
                    }
                }, {
                    $: {
                        SegmentKey: 'SEG5'
                    },
                    Departure: {
                        AirportCode: 'RIX',
                        Date: '2016-06-25',
                        Time: '14:15',
                        AirportName: 'Riga International'
                    },
                    Arrival: {
                        AirportCode: 'FRA',
                        Date: '2016-06-25',
                        Time: '15:30',
                        AirportName: 'Frankfurt International'
                    },
                    MarketingCarrier: {
                        AirlineID: 'C9',
                        Name: 'Kronos Air',
                        FlightNumber: '891'
                    },
                    OperatingCarrier: {
                        AirlineID: 'C9',
                        Name: 'Kronos Air',
                        FlightNumber: '891'
                    },
                    Equipment: {
                        AircraftCode: '321',
                        Name: '321 - AIRBUS INDUSTRIE A321 JET'
                    },
                    FlightDetail: {
                        FlightDuration: {
                            Value: 'PT1H15M'
                        }
                    }
                }, {
                    $: {
                        SegmentKey: 'SEG6'
                    },
                    Departure: {
                        AirportCode: 'FRA',
                        Date: '2016-06-25',
                        Time: '16:00',
                        AirportName: 'Frankfurt International'
                    },
                    Arrival: {
                        AirportCode: 'ARN',
                        Date: '2016-06-25',
                        Time: '18:00'
                    },
                    MarketingCarrier: {
                        AirlineID: 'C9',
                        Name: 'Kronos Air',
                        FlightNumber: '804'
                    },
                    OperatingCarrier: {
                        AirlineID: 'C9',
                        Name: 'Kronos Air',
                        FlightNumber: '804'
                    },
                    Equipment: {
                        AircraftCode: '32A',
                        Name: ''
                    },
                    FlightDetail: {
                        FlightDuration: {
                            Value: 'PT2H0M'
                        }
                    }
                }]
            },
            OriginDestinationList: {
                OriginDestination: [{
                    $: {
                        OriginDestinationKey: 'OD1'
                    },
                    DepartureCode: 'ARN',
                    ArrivalCode: 'RIX'
                }, {
                    $: {
                        OriginDestinationKey: 'OD2'
                    },
                    DepartureCode: 'RIX',
                    ArrivalCode: 'ARN'
                }]
            }
        }
    };
};
module.exports = OrderRetrieve;
