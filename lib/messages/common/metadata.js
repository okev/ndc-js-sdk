module.exports = function (data) {
    return {
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
    };
};