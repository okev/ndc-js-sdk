'use strict';

var common = require('./common');
var AirShopping = function (data) {
    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data),
        Parameters: {
            CurrCodes: {
                CurrCode: data.courrencyCode,
            }
        },
        Travelers: common.Travelers(data),
        CoreQuery: {
            OriginDestinations: data.onds.map(function (ond) {
                return {
                    OriginDestination: common.OriginDestinations(ond, data)
                };
            })
        },
        Preference: common.Preference(data),
        CabinPreferences: (data.cabin ? {
            CabinType: common.CabinType(data)
        } : null),
        Metadata: common.Metadata(data)
    };
};

module.exports = AirShopping;
