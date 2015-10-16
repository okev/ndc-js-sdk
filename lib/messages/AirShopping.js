'use strict';

var common = require('./common');
var AirShopping = function (data) {
    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data),
        Parameters: common.Parameters(data),
        Travelers: common.Travelers(data),
        CoreQuery: {
            OriginDestinations: data.onds.map(function (ond) {
                return common.OriginDestinations(ond, data, 'OriginDestination');
            })
        },
        Preferences: common.Preferences(data),
        CabinPreferences: (data.cabin ? {
            CabinType: common.CabinType(data)
        } : null),
        Metadata: common.Metadata(data)
    };
};

module.exports = AirShopping;
