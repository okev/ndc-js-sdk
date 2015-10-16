'use strict';

var common = require('./common');
var ServicePrice = function ServicePrice(data) {
    return {
        Document: common.Document(data),
        Party: common.Party(data, true),
        ShoppingResponseIDs: {
            ResponseID: data.responseID
        }
    };
};
module.exports = ServicePrice;
