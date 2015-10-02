'use strict';

var FlightPrice = function (data) {
    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data),
        Parameters: {
            Languages: {
                Language: {
                    LanguageCode: data.language
                }
            },
            CurrCodes: {
                CurrCode: data.courrencyCode,
            },
            Pricing: {
                _AwardIncludedInd: false
            }
        },
    };
};

module.exports = FlightPrice;
