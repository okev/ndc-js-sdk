'use strict';

var AirShopping = function (config) {
    var common = config.common;

    this.request = function () {
        return '<AirShoppingRQ xmlns="http://www.iata.org/IATA/EDIST" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.iata.org/IATA/EDIST ../AirShoppingRQ.xsd" EchoToken="8fdb1c621a7a4454aa3360556e7784d5" TimeStamp="2015-02-01T12:38:00Z" Version="1.1.5" TransactionIdentifier="TRN12345">\
  <PointOfSale>\
    <Location>\
      <CountryCode>{{ CountryCode }}</CountryCode>\
      <CityCode>{{ CityCode }}</CityCode>\
    </Location>\
    <RequestTime Zone="EST">{{ requestTime }}</RequestTime>\
    <TouchPoint>\
      <Device>\
        <Code>{{ Code }}</Code>\
        <Definition>{{ Definition }}</Definition>\
        <Position>\
          <Latitude>{{ Latitude }}</Latitude>\
          <Longitude>{{ Longitude }}</Longitude>\
          <NAC>{{ NAC }}</NAC>\
        </Position>\
      </Device>\
      <Event>\
        <Code>{{ Code }}</Code>\
        <Definition>{{ Definition }}</Definition>\
      </Event>\
    </TouchPoint>\
  </PointOfSale>\
  <Document>\
    <Name>{{ Name }}</Name>\
    <ReferenceVersion>{{ ReferenceVersion }}</ReferenceVersion>\
  </Document>\
  <Party>\
    <Sender>\
      <ORA_Sender>\
        <AirlineID>{{ AirlineID }}</AirlineID>\
        <Name>{{ Name }}</Name>\
        <AgentUser>\
          <Name>{{ Name }}</Name>\
          <Type>{{ Type }}</Type>\
          <Contacts>\
            <Contact>\
              <EmailContact>\
                <Address>{{ Address }}</Address>\
              </EmailContact>\
            </Contact>\
          </Contacts>\
          <PseudoCity>{{ PseudoCity }}</PseudoCity>\
          <IATA_Number>{{ IATA_Number }}</IATA_Number>\
          <AgentUserID>{{ AgentUserID }}</AgentUserID>\
        </AgentUser>\
      </ORA_Sender>\
    </Sender>\
  </Party>\
  <Parameters>\
    <CurrCodes>\
      <CurrCode>{{ CurrCode }}</CurrCode>\
    </CurrCodes>\
  </Parameters>\
  <Travelers>\
    <Traveler>\
      <AnonymousTraveler>\
        <PTC Quantity="1">ADT</PTC>\
      </AnonymousTraveler>\
     </Traveler>\
  </Travelers>\
  <CoreQuery>\
    <OriginDestinations>\
      <OriginDestination>\
        <Departure>\
          <AirportCode>{{ AirportCode }}</AirportCode>\
          <Date>{{ Date }}</Date>\
        </Departure>\
        <Arrival>\
          <AirportCode>{{ AirportCode }}</AirportCode>\
        </Arrival>\
        <MarketingCarrierAirline>\
          <AirlineID>{{ AirlineID }}</AirlineID>\
          <Name>{{ Name }}</Name>\
        </MarketingCarrierAirline>\
      </OriginDestination>\
    </OriginDestinations>\
  </CoreQuery>\
  <Preference>\
    <AirlinePreferences>\
      <Airline>\
        <AirlineID>{{ AirlineID }}</AirlineID>\
      </Airline>\
    </AirlinePreferences>\
  </Preference>\
  <Metadata>\
    <Other>\
      <OtherMetadata>\
        <CurrencyMetadatas>\
          <CurrencyMetadata MetadataKey="EUR">\
            <Decimals>{{ Decimals }}</Decimals>\
          </CurrencyMetadata>\
        </CurrencyMetadatas>\
      </OtherMetadata>\
    </Other>\
  </Metadata>\
</AirShoppingRQ>';
    };

    /*
        @message = Nokogiri::XML::Builder.new {|xml|
                  xml.AirShoppingRQ {
                    xml.Document {
                      xml.MessageVersion_ "1.1.3"
                    }
                    xml.Party {
                      xml.Sender {
                        xml.TravelAgencySender {
                          xml.Name_ @travel_agency['name']
                          xml.IATA_Number_ @travel_agency['IATA_Number']
                          xml.AgencyID_ @travel_agency['agencyID']
                        }
                      }
                      xml.Participants {
                        xml.Participant {
                          xml.AggregatorParticipant( SequenceNumber: 1){
                            xml.Name_ "Flyiin"
                            xml.AggregatorID_ "Flyiin AggregatorID"
                          }
                        }
                      }
                    }
                    xml.Travelers {
                      xml.Traveler {
                        xml.AnonymousTraveler {
                          xml.PTC_ "ADT"
                        }
                      }
                    }
                    xml.CoreQuery {
                      xml.OriginDestinations {
                        xml.OriginDestination {
                          xml.Departure {
                            xml.AirportCode_ params[:departure_airport_code]
                            xml.Date_ params[:departure_date]
                          }
                          xml.Arrival {
                            xml.AirportCode_ params[:arrival_airport_code]
                          }
                        }
                      }
                    }
                    xml.Preferences {
                      xml.Preference {
                        xml.FarePreferences {
                          xml.Types {
                            xml.Type {
                              xml.Code_ 759
                            }
                          }
                        }
                      }
                    }
                    xml.Metadata {
                      xml.Other {
                        xml.OtherMetadata {
                          xml.LanguageMetadatas {
                            xml.LanguageMetadata(MetadataKey: "Display"){
                              xml.Application_ "Display"
                              xml.Code_ISO_ "en"
                            }
                          }
                        }
                      }
                    }
                  }
        }
      end

     */
}
module.exports = AirShopping;