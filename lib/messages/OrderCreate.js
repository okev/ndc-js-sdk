'use strict';

var util = require('util');
var common = require('./common');
var OrderCreate = function (data) {
    var query = common.Travelers(data, 'Passengers', 'Passenger');
    query.OrderItems = {
        ShoppingResponse: {
            Owner: data.shoppingRS.owner,
            ResponseID: data.shoppingRS.id,
            Offers: {
                Offer: data.shoppingRS.offers.map(function (offer) {
                    return {
                        OfferID: {
                            _Owner: offer.owner || data.shoppingRS.owner,
                            _: offer.id
                        },
                        OfferItems: {
                            OfferItem: offer.items.map(function (item) {
                                return {
                                    OfferItemID: {
                                        _Owner: item.owner || data.shoppingRS.owner,
                                        _: item.id
                                    },
                                    Passengers: {
                                        PassengerReference: item.passenger
                                    },
                                    AssociatedServices: {
                                        AssociatedService: item.associatedServices.map(function (service) {
                                            return {
                                                ServiceID: {
                                                    _Owner: service.owner || data.shoppingRS.owner,
                                                    _: service.id
                                                }
                                            };
                                        })
                                    }
                                };
                            })
                        }
                    };
                })
            }
        }
    };
    query.Payments = {
        Payment: {
            Method: {
                PaymentCard: {
                    CardCode: data.payment.card.type,
                    CardNumber: data.payment.card.number,
                    SeriesCode: data.payment.card.series,
                    EffectiveExpireDate: {
                        Effective: data.payment.card.expiration
                    }
                }
            },
            Amount: {
                _Taxable: (!!data.payment.taxable).toString(),
                _: data.payment.amount.toString()
            },
            Payer: {
                Name: {
                    Surname: data.payment.payer.surname,
                    Given: data.payment.payer.given
                },
                Contacts: {
                    Contact: {
                        AddressContact: {
                            Street: data.payment.payer.street,
                            CityName: {
                                CityCode: data.payment.payer.city
                            },
                            PostalCode: data.payment.payer.postalCode,
                            CountryCode: data.payment.payer.country
                        },
                        EmailContact: {
                            Address: data.payment.payer.email
                        }
                    }
                }
            }
        }
    };
    query.DataLists = {
        ServiceList: {
            Service: data.services.map(function (service) {
                return {
                    _ObjectKey: service.key,
                    ServiceID: {
                        _Owner: service.owner || data.shoppingRS.owner,
                        _: service.id
                    },
                    Name: service.name,
                    Encoding: service.encoding || '',
                    FeeMethod: service.feeMethod,
                    Descriptions: {
                        Description: {
                            Text: service.description,
                            Link: service.media.link,
                            Media: [{
                                ObjectID: service.media.id
                            }, {
                                MediaLink: service.media.link
                            }],
                        }
                    },
                    Settlement: {
                        Method: {
                            Code: service.settlement.code,
                            Definition: service.settlement.definition
                        },
                    },
                    Price: {
                        Total: service.price.total,
                        PassengerReferences: service.price.passengerReference
                    }
                };
            })
        }
    };

    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data, true),
        Query: query,
        Metadata: common.Metadata(data)
    };
};

module.exports = OrderCreate;
