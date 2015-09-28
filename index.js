'use strict';

var fs = require('fs');
var util = require('util');
var request = require('request');
var debug = require('./lib/debug');
var easyxml = new(require('easyxml'))();
var xml2js = new require('xml2js').Parser({
  explicitArray: false
});
var XMLProlog = '<?xml version="1.0" encoding="utf-8"?>';

/* Main module */
var NDC = function (config) {
  var ndc = this;
  ndc.config = config;
  ndc.version = '1.1.5';
  // Ignore where to get these from
  ndc.transactionID = 'TRN12345';
  ndc.echoToken = '8fdb1c621a7a4454aa3360556e7784d5';

  var makeRequest = function (body, cb, prolog) {
    var url = 'http://' + ndc.config.endpoint + '/dondc';
    debug.info('Posting message to %s:\n%s', url, body);
    request({
      uri: url,
      method: 'POST',
      body: (prolog ? XMLProlog : '') + body,
      headers: {
        'Content-Type': 'application/xml'
      }
    }, function (err, res, body) {
      if (err) {
        debug.error('ERROR:', err.name, err.message);
        return cb(err);
      }

      debug.info('Status Code: %s', res.statusCode);
      debug.info('Headers %j:', res.headers);
      debug.info('Raw Body:\n', body);
      xml2js.parseString(res.body, function (err, data) {
        if (err || !data) {
          err = err || new Error('Empty Response');
        }

        var responseType = Object.keys(data)[0];
        if (data[responseType].Errors && data[responseType].Errors.Error) {
          err = data[responseType].Errors.Error;
          err = new Error(((err instanceof Array) ? err[0] : err) || 'Unknown Error');
        }

        if (err) {
          debug.error(err);
          cb(err);
        } else {
          debug.info('%s message:\n%j', responseType, data);
          cb(null, data);
        }
      });
    }).on('error', function (err) {
      cb(err);
    });
  };

  ndc.messages = fs.readdirSync(__dirname + '/lib/messages').reduce(function (messages, file) {
    if (!/\.js$/.test(file)) {
      return messages;
    }

    var name = file.replace(/\.js/, '');
    debug.info('Loading "%s" message handler', name + 'RQ');
    messages[name] = function (data) {
      data = data || {};
      debug.info('Requesting "%s" message with data: %j', name, data);
      var messageHandler = require(__dirname + '/lib/messages/' + file);
      var messageData = Object.keys(data).reduce(function buildMessageData(result, key) {
        result[key] = data[key];
        return result;
      }, {
        /* Common config */
        transactionID: ndc.transactionID,
        airline: ndc.config.airline,
        agency: ndc.config.agency,
        courrencyCode: ndc.config.courrencyCode,
        countryCode: ndc.config.countryCode,
        cityCode: ndc.config.cityCode
      });
      var result = util._extend(messageHandler(messageData),
        /* XML message attributes */
        {
          _xmlns: 'http://www.iata.org/IATA/EDIST',
          '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          '_xsi:schemaLocation': 'http://www.iata.org/IATA/EDIST ../' + name + 'RQ.xsd',
          _EchoToken: ndc.echoToken,
          _TimeStamp: (new Date()).toISOString(),
          _Version: '1.1.5',
          _TransactionIdentifier: ndc.transactionID
        });

      var toXML = function toXML(pretty, prolog) {
        easyxml.config.rootElement = name + 'RQ';
        var xml = easyxml.render(result);
        if (!pretty) {
          xml.replace(/\n\s+/g, '');
        }
        if (prolog) {
          xml = XMLProlog + (pretty ? '\n' : '') + xml;
        }
        return xml;
      };
      var wrapBody = function wrapBody(wrap, body) {
        wrap = wrap || {
          begin: '',
          end: ''
        };
        return wrap.begin + body + wrap.end;
      };

      return {
        raw: function () {
          return result;
        },
        toJSON: function (pretty) {
          return JSON.stringify(result, null, pretty ? '  ' : '');
        },
        toXML: function (pretty, prolog, wrap) {
          return wrapBody(wrap, toXML(result, pretty, prolog));
        },
        forcedBody: function (body) {
          this._forcedBody = body;
        },
        request: function (cb, prolog, wrap) {
          return makeRequest(wrapBody(wrap, this._forcedBody || this.toXML()), cb, prolog);
        }
      };
    };
    return messages;
  }, {});

  ndc.request = function (message, data, callback) {
    var msg = ndc.messages[message](data);
    msg.request(callback);
  };
};

module.exports = NDC;
