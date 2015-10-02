module.exports = function (data) {
    return {
        Sender: {
            ORA_Sender: {
                AirlineID: data.airline.id,
                Name: data.airline.name,
                AgentUser: {
                    Name: data.agency.name,
                    Type: data.agency.type,
                    Contacts: {
                        Contact: [{
                            EmailContact: {
                                Address: data.agency.email,
                            }
                        }]
                    },
                    PseudoCity: 'A4A',
                    IATA_Number: data.agency.IATANumber,
                    AgentUserID: data.agency.userId,
                }
            }
        }
    }
};
