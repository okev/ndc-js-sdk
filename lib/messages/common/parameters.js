'use strict';
module.exports = function Parameters(data) {
    return {
        Languages: {
            LanguageCode: data.language
        },
        CurrCodes: {
            CurrCode: data.courrencyCode,
        },
        Pricing: (data.message === 'FlightPrice' ? {
            _AwardIncludedInd: 'false'
        } : null)
    };
};
