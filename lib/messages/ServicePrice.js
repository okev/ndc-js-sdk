'use strict';

var common = require('./common');
var ServicePrice = function ServicePrice(data) {
    return {
        Document: common.Document(data),
        Party: common.Party(data, true),
        ShoppingResponseID: {
            ResponseID: data.responseID
        }
    };
};
module.exports = ServicePrice;
