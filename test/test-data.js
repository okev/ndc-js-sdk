'use strict';
var TestData = {};
TestData.config = [
    /* Kronos Air config data*/
    {
        latitude: 38.89756,
        longitude: -77.03650,
        providerName: 'KRONOS NDC GATEWAY',
        courrencyCode: 'EUR',
        countryCode: 'US',
        cityCode: 'WAS',
        language: 'en',
        endpoint: 'http://iata.api.mashery.com/kronos/api',
        airline: {
            id: 'C9',
            name: 'Kronos Air',
        },
        sender: {
            id: 'C9',
            name: 'Kronos Air',
            pseudoCity: 'A4A',
            IATANumber: '98417900',
            type: 'TravelManagementCompany',
            email: 'info@carsontravels.com'
        },
        agent: {
            name: 'Carson Travels',
            id: 'ksmith212'
        },
    },
    /* BA config data*/
    {
        latitude: 38.89756,
        longitude: -77.03650,
        providerName: 'BA NDC GATEWAY',
        courrencyCode: 'USD',
        countryCode: 'US',
        cityCode: 'WAS',
        language: 'en',
        endpoint: 'http://iata.api.mashery.com/kronos/api',
        airline: {
            id: 'C9',
            name: 'Kronos Air',
        },
        sender: {
            id: 'test agent',
            name: 'test agent',
            owner: 'BA',
            pseudoCity: '1F8',
            IATANumber: '35200421',
            type: 'TravelAgency',
            email: 'ndc@usdtravel.com'
        },
        agent: {
            name: 'John Smith',
            id: '1980',
            role: 'Admin'
        }
    }
];
TestData.AirShopping = [
    /* OneWay with multiple pax */
    {
        pointOfSaleEvent: {
            code: 9,
            definition: 'Shop'
        },
        onds: [{
            flights: [{
                departure: {
                    date: new Date('2016-03-06'),
                    airportCode: 'CDG'
                },
                arrival: {
                    airportCode: 'FRA'
                },
                airline: TestData.config.sender
            }]
        }],
        cabin: 'C',
        travelers: [
            /* two anonymous adults */
            {
                anonymous: true,
                count: 2,
                type: 'ADT'
            },
            /* 1 anonymous children */
            {
                anonymous: true,
                count: 1,
                type: 'CNN'
            },
            /* 1 anonymous infant */
            {
                anonymous: true,
                count: 1,
                type: 'INF'
            }
        ]
    },
    /* RoundTrip with Calendar - Direct Flight */
    {
        pointOfSaleEvent: {
            code: 9,
            definition: 'Shop'
        },
        onds: [{
            flights: [{
                departure: {
                    date: new Date('2016-02-10'),
                    airportCode: 'FRA'
                },
                arrival: {
                    airportCode: 'CDG'
                },
                calendar: {
                    before: 3,
                    after: 3
                }
            }]
        }, {
            flights: [{
                departure: {
                    date: new Date('2016-03-06'),
                    airportCode: 'CDG'
                },
                arrival: {
                    airportCode: 'FRA'
                },
                calendar: {
                    before: 2,
                    after: 2
                }
            }]
        }],
        cabin: 'M',
        travelers: [
            /* one regognized adult */
            {
                key: 'PAX1',
                type: 'ADT',
                residenceCode: 'US',
                age: {
                    birthDate: '1989-09-09'
                },
                name: {
                    title: 'MR',
                    given: 'Mithalesh',
                    middle: 'Ignatius',
                    surname: 'Yadav'
                },
                contact: {
                    email: 'mithalesh@jrtechnologies.com',
                    phone: '9867236088'
                },
                profileID: '123',
                gender: 'Male',
                fqtvs: [{
                    programID: 'kR',
                    providerID: 'KR',
                    accountNumber: '992227471658222'
                }],
                foids: [{
                    type: 'PP',
                    id: '333444666'
                }]
            }
        ]
    },
    /* RoundTrip with all cabin */
    {
        pointOfSaleEvent: {
            code: 9,
            definition: 'Shop'
        },
        onds: [{
            flights: [{
                departure: {
                    date: new Date('2016-08-27'),
                    airportCode: 'ARN'
                },
                arrival: {
                    airportCode: 'BNC'
                }
            }]
        }, {
            flight: [{
                departure: {
                    date: new Date('2016-09-12'),
                    airportCode: 'BNC'
                },
                arrival: {
                    airportCode: 'ARN'
                }
            }]
        }],
        travelers: [
            /* one anonymous adult */
            {
                anonymous: true,
                count: 1,
                type: 'ADT'
            }
        ]
    }
];
TestData.FlightPrice = [
    /* OneWay Flight */
    {
        pointOfSaleEvent: {
            code: 9,
            definition: 'Shop'
        },
        onds: [{
            flights: [{
                departure: {
                    date: new Date('2016-04-06T12:45:00Z'),
                    airportCode: 'BCN'
                },
                arrival: {
                    date: new Date('2016-04-06T14:55:00Z'),
                    airportCode: 'FRA'
                },
                airline: {
                    id: 'C9',
                    name: 'Kronos Airlines'
                },
                number: 1127,
                aircraftCode: '321',
                cabin: 'C'
            }, {
                departure: {
                    date: new Date('2016-04-06T16:15:00Z'),
                    airportCode: 'FRA'
                },
                arrival: {
                    date: new Date('2016-04-06T17:15:00Z'),
                    airportCode: 'PRG'
                },
                airline: {
                    id: 'C9',
                    name: 'Kronos Airlines'
                },
                number: 1398,
                aircraftCode: '733',
                cabin: 'C'
            }]
        }],
        participants: [{
            name: 'Travel',
            id: 'Travel'
        }],
        fareCodes: ['BRO'],
        travelers: [
            /* one anonymous adult */
            {
                anonymous: true,
                count: 1,
                type: 'ADT'
            },
            /* one anonymous child */
            {
                anonymous: true,
                count: 1,
                type: 'CHD'
            }
        ]
    },
    /* RoundTrip Flight */
    {
        pointOfSaleEvent: {
            code: 9,
            definition: 'Shop'
        },
        opCarrier: {
            id: 'C9',
            name: 'Kronos Airlines'
        },
        onds: [{
            flights: [{
                departure: {
                    date: new Date('2016-04-05T09:05:00Z'),
                    airportCode: 'ARN'
                },
                arrival: {
                    date: new Date('2016-04-05T11:15:00Z'),
                    airportCode: 'MUC',
                    airportName: 'Munich International'
                },
                airline: {
                    id: 'C9',
                    name: 'Kronos Airlines'
                },
                number: 2413,
                aircraftCode: 'CR9',
                aircraftName: 'CR9 - CANADAIR REGIONAL JET 900 JET',
                cabin: 'M'
            }, {
                departure: {
                    date: new Date('2016-05-06T12:40:00Z'),
                    airportCode: 'MUC',
                    airportName: 'Munich International'
                },
                arrival: {
                    date: new Date('2016-04-05T17:15:00Z'),
                    airportCode: 'BCN',
                    airportName: 'Barcelona Airport'
                },
                airline: {
                    id: 'C9',
                    name: 'Kronos Airlines'
                },
                number: 1812,
                aircraftCode: '321',
                aircraftName: '321 - AIRBUS INDUSTRIE A321 JET',
                cabin: 'M'
            }]
        }, {
            flights: [{
                departure: {
                    date: new Date('2016-07-12T12:45:00Z'),
                    airportCode: 'BCN',
                    airportName: 'Barcelona Airport'
                },
                arrival: {
                    date: new Date('2016-04-05T11:15:00Z'),
                    airportCode: 'FRA',
                    airportName: 'Frankfurt International'
                },
                airline: {
                    id: 'C9',
                    name: 'Kronos Airlines'
                },
                number: 2413,
                aircraftCode: 'CR9',
                aircraftName: 'CR9 - CANADAIR REGIONAL JET 900 JET',
                cabin: 'M'
            }, {
                departure: {
                    date: new Date('2016-05-06T12:40:00Z'),
                    airportCode: 'MUC',
                    airportName: 'Munich International'
                },
                arrival: {
                    date: new Date('2016-04-05T17:15:00Z'),
                    airportCode: 'BCN',
                    airportName: 'Barcelona Airport'
                },
                airline: {
                    id: 'C9',
                    name: 'Kronos Airlines'
                },
                number: 1812,
                aircraftCode: '321',
                aircraftName: '321 - AIRBUS INDUSTRIE A321 JET',
                cabin: 'M'
            }]
        }],
        participants: [{
            name: 'Travel',
            id: 'Travel'
        }],
        fareCodes: ['BRO'],
        travelers: [
            /* one anonymous adult */
            {
                anonymous: true,
                count: 1,
                type: 'ADT'
            },
            /* one anonymous child */
            {
                anonymous: true,
                count: 1,
                type: 'CHD'
            }
        ]
    }
];
TestData.SeatAvailability = [{
    opCarrier: {
        id: 'C9',
        name: 'Kronos Airlines'
    },
    flightList: [{
        key: 'FL1',
        journey: 'PT17H55M',
        segments: ['SEG1', 'SEG2']
    }],
    onds: [{
        key: 'OID1',
        flights: [{
            segmentKey: 'SEG1',
            departure: {
                date: new Date('2016-04-06T12:45:00Z'),
                airportCode: 'BCN',
                airportName: 'Barcelona Airport'
            },
            arrival: {
                date: new Date('2016-04-06T14:55:00Z'),
                airportCode: 'FRA',
                airportName: 'Frankfurt International'
            },
            airline: {
                id: 'C9',
                name: 'Kronos Airlines'
            },
            number: 1127,
            aircraftCode: '321',
            aircraftName: '321 - AIRBUS INDUSTRIE A321 JET',
            classOfService: 'M',
            detail: 'PT2H10M'
        }, {
            segmentKey: 'SEG2',
            departure: {
                date: new Date('2016-04-06T16:15:00Z'),
                airportCode: 'FRA',
                airportName: 'Frankfurt International'
            },
            arrival: {
                date: new Date('2016-04-06T17:15:00Z'),
                airportCode: 'PRG',
                airportName: 'Prague Ruzyne'
            },
            airline: {
                id: 'C9',
                name: 'Kronos Airlines'
            },
            number: 1398,
            aircraftCode: '733',
            aircraftName: '733 - BOEING JET',
            classOfService: 'C',
            detail: 'PT1H0M'
        }]
    }],
    ondList: [{
        key: 'OID1',
        departureCode: 'BCN',
        arrivalCode: 'PRG',
        flights: ['FL1']
    }]
}];
TestData.ServiceList = [{
    responseID: 'RE6c07bf8de1a04859bda7a027ad11d665'
}];
TestData.ServicePrice = [{
    responseID: 'RE6c07bf8de1a04859bda7a027ad11d665'
}];
TestData.OrderCreate = [
    /* OneWay with multiple pax */
    {
        pointOfSaleEvent: {
            code: 1,
            definition: 'Order or buy'
        },
        travelers: [
            /* one regognized adult */
            {
                key: 'PAX1',
                type: 'ADT',
                residenceCode: 'US',
                age: {
                    birthDate: '1989-09-09'
                },
                name: {
                    title: 'MR',
                    given: 'Mithalesh',
                    middle: 'Ignatius',
                    surname: 'Yadav'
                },
                contact: {
                    email: 'mithalesh@jrtechnologies.com',
                    phone: '9867236088',
                    address: {
                        street: '22 Main Street',
                        city: 'FRA',
                        postalCode: '14201',
                        country: 'DE'
                    }
                },
                profileID: '123',
                gender: 'Male',
                fqtvs: [{
                    programID: 'kR',
                    providerID: 'KR',
                    accountNumber: '992227471658222'
                }],
                foids: [{
                    type: 'PP',
                    id: '333444666'
                }]
            }
        ],
        shoppingRS: {
            owner: 'C9',
            id: 'RE1483855093934f3eab41b84010934560',
            offers: [{
                owner: 'C9',
                id: '1',
                items: [{
                    owner: 'C9',
                    id: '1#M#108161700#108170568',
                    passenger: 'PAX1',
                    associatedServices: [{
                        owner: 'C9',
                        id: 'SV1'
                    }, {
                        owner: 'C9',
                        id: 'SV2'
                    }]
                }]
            }, {
                owner: 'C9',
                id: 5,
                items: [{
                    owner: 'C9',
                    id: '1#M#109953106#109939177',
                    passenger: 'PAX1',
                    associatedServices: [{
                        owner: 'C9',
                        id: 'SV1'
                    }, {
                        owner: 'C9',
                        id: 'SV2'
                    }]
                }]
            }]
        },
        payment: {
            card: {
                type: 'MC',
                number: '1111222233334444',
                series: '584',
                expiration: '0322'
            },
            taxable: true,
            amount: 201987,
            payer: {
                surname: 'Yadav',
                given: 'Mithalesh',
                street: '22 Main Street',
                city: 'FRA',
                postalCode: '14201',
                country: 'DE',
                email: 'mithalesh@jrtechnologies.com'
            }
        },
        services: [{
            key: 'SV1',
            owner: 'C9',
            id: '1011',
            name: 'Complimentary Meal',
            feeMethod: 'OC',
            description: 'Complimentary three course meal and drinks',
            media: {
                id: 'iconerror.png',
                link: 'http://kronos.jrtechnologies.com/ServiceImage/iconerror.png'
            },
            settlement: {
                code: 'AD',
                definition: 'Internal Airline Document'
            },
            price: {
                total: 0,
                passengerReference: 'SH1'
            }
        }, {
            key: 'SV2',
            owner: 'C9',
            id: '1017',
            name: 'Meal',
            feeMethod: 'OC',
            description: 'Vegetarian Vegan Meal',
            media: {
                id: 'int_economy_promo.jpg',
                link: 'http://kronos.jrtechnologies.com/ServiceImage/int_economy_promo.jpg'
            },
            settlement: {
                code: 'AD',
                definition: 'Internal Airline Document'
            },
            price: {
                total: 2400,
                passengerReference: 'SH1'
            }
        }]
    }
];
TestData.OrderList = [
    /* Airline Filter */
    {
        pointOfSaleEvent: {
            code: 1,
            definition: 'Order or buy'
        },
        filter: {
            airlineID: 'C9'
        }
    }
];
TestData.OrderRetrieve = [
    /* Airline Filter */
    {
        pointOfSaleEvent: {
            code: 1,
            definition: 'Order or buy'
        },
        order: {
            owner: 'C9',
            id: 'L9A821'
        }
    }
];

module.exports = TestData;
