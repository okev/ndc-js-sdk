'use strict';

var common = require('./common');
var OrderCancel = function (data) {
    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data, true),
        Query: {
            OrderID: {
                _Owner: data.order.owner || data.sender.owner,
                _: data.order.id
            }
        }
    };
};
module.exports = OrderCancel;
