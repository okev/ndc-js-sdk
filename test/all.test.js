'use strict';

var should = require('should'),
    testData = require('./test-data'),
    NDC = require('../'),
    ndc = new NDC(testData.config[0]);

describe('NDC client', function () {
    describe('should handle AirShoppingRQ/RS messages', function () {
        it('should create "one flight" XML messages with only one <OriginDestination> element', function (done) {
            var xml = ndc.messages.AirShopping(testData.AirShopping[0]).toXML(true, true);
            should(xml.match(/<OriginDestination>/g).length).equal(1);
            done();
        });
        it('should create "round trip" XML messages with two <OriginDestination> elements', function (done) {
            var xml = ndc.messages.AirShopping(testData.AirShopping[1]).toXML(true, true);
            should(xml.match(/<OriginDestination>/g).length).equal(2);
            done();
        });
        it('should receive a successful response with a "ShoppingResponseID" element', function (done) {
            var msg = ndc.messages.AirShopping(testData.AirShopping[1]);
            msg.request(function (err, data) {
                should.not.exist(err);
                should.exist(data.AirShoppingRS.Success);
                should.exist(data.AirShoppingRS.ShoppingResponseID);
                done();
            });
        });
    });
    describe('should handle FlightPriceRQ/RS messages', function () {
        it('should receive a successful response with "PricedFlightOffers" element', function (done) {
            var msg = ndc.messages.FlightPrice(testData.FlightPrice[0]);
            msg.request(function (err, data) {
                should.not.exist(err);
                should.exist(data.FlightPriceRS.Success);
                should.exist(data.FlightPriceRS.ShoppingResponseID);
                should.exist(data.FlightPriceRS.PricedFlightOffers);
                done();
            });
        });
    });
    describe('should handle ItineraryReshopRQ/RS messages', function () {
        it('pending tests...');
    });
    describe('should handle ItinReshopRQ/RS messages', function () {
        it('pending tests...');
    });
    describe('should handle OrderChangeRQ/RS messages', function () {
        it('pending tests...');
    });
    describe('should handle OrderCreateRQ/RS messages', function () {
        it('pending tests...');
    });
    describe('should handle SeatAvailabilityRQ/RS messages', function () {
        it('pending tests...');
    });
    describe('should handle ServiceListRQ/RS messages', function () {
        it('pending tests...');
    });
    describe('should handle ServicePriceRQ/RS messages', function () {
        it('pending tests...');
    });
});
