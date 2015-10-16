'use strict';

var common = require('./common');
var ServiceList = function ServiceList(data) {
    return {
        Document: common.Document(data),
        Party: common.Party(data, true),
        ShoppingResponseIDs: {
            ResponseID: data.responseID
        }
    };
};
module.exports = ServiceList;
