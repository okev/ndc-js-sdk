module.exports = function Travelers(data) {
    return {
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
    };
};
