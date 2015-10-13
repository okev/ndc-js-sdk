'use strict';

var should = require('should'),
    testData = require('./test-data'),
    NDC = require('../');

testData.config[0].APIAuthKey = testData.config[1].APIAuthKey = process.env.API_KEY;

var ndc = new NDC(testData.config[0]);

describe('NDC client', function () {
    describe('Shopping messages', function () {
        describe('should handle AirShopping messages', function () {
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
        describe('should handle FlightPrice messages', function () {
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
        describe('should handle SeatAvailability messages', function () {
            it('should receive a successful response with "Flights" and "DataLists" elements', function (done) {
                var msg = ndc.messages.SeatAvailability(testData.SeatAvailability[0]);
                msg.request(function (err, data) {
                    should.not.exist(err);
                    should.exist(data.SeatAvailabilityRS.Success);
                    should.exist(data.SeatAvailabilityRS.Flights);
                    should.exist(data.SeatAvailabilityRS.DataLists);
                    done();
                });
            });
        });
        describe('should handle ServiceList messages', function () {
            it('pending tests...');
        });
        describe('should handle ServicePrice messages', function () {
            it('pending tests...');
        });
    });
    describe('Order management messages', function () {
        describe('should handle OrderCreate messages', function () {
            it('pending tests...');
        });
        describe('should handle OrderList messages', function () {
            it('pending tests...');
        });
        describe('should handle OrderRetrieve messages', function () {
            it('pending tests...');
        });
        describe('should handle OrderCancel messages', function () {
            it('pending tests...');
        });
        describe('should handle ItinReshop messages', function () {
            it('pending tests...');
        });

    });
});
