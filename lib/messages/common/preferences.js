module.exports = function Preferences(data) {
    return {
        Preference: {
            AirlinePreferences: {
                Airline: {
                    AirlineID: (data.airline || data.sender).id,
                }
            },
            FarePreferences: {
                FareCodes: (data.fareCodes && data.fareCodes.length ? {
                    Code: data.fareCodes.map(function (fareCode) {
                        return {
                            Code: fareCode
                        };
                    })
                } : null)
            }
        }
    };
};
