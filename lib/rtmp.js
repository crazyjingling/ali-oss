/**
 * Copyright(c) ali-sdk and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   rockuw <rockuw@gmail.com> (http://rockuw.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('ali-oss:rtmp');
var jstoxml = require('jstoxml');

var proto = exports;

/**
 * RTMP operations
 */

/**
 * Create a live channel
 * @param {String} id the channel id
 * @param {Object} conf the channel configuration
 * @param {Object} options
 * @return {Object}
 */
proto.putChannel = function* (id, conf, options) {
  options = options || {};
  options.subres = 'live';

  var params = this._objectRequestParams('PUT', id, options);
  params.content = jstoxml.toXML({
    LiveChannelConfiguration: conf
  });
  params.successStatuses = [200];

  var result = yield this.request(params);

  return {
    res: result.res
  };
};

/**
 * Get the channel info
 * @param {String} id the channel id
 * @param {Object} options
 * @return {Object}
 */
proto.getChannel = function* (id, options) {
  options = options || {};
  options.subres = 'live';

  var params = this._objectRequestParams('GET', id, options);
  params.xmlResponse = true;
  params.successStatuses = [200];

  var result = yield this.request(params);

  return {
    data: result.data,
    res: result.res
  };
};

/**
 * Delete the channel
 * @param {String} id the channel id
 * @param {Object} options
 * @return {Object}
 */
proto.deleteChannel = function* (id, options) {
  options = options || {};
  options.subres = 'live';

  var params = this._objectRequestParams('DELETE', id, options);
  params.successStatuses = [204];

  var result = yield this.request(params);

  return {
    res: result.res
  };
};

/**
 * Set the channel status
 * @param {String} id the channel id
 * @param {String} status the channel status
 * @param {Object} options
 * @return {Object}
 */
proto.putChannelStatus = function* (id, status, options) {
  options = options || {};
  options.subres = {
    'live': null,
    'status': status
  };

  var params = this._objectRequestParams('PUT', id, options);
  params.successStatuses = [200];

  var result = yield this.request(params);

  return {
    res: result.res,
  };
};

/**
 * Get the channel status
 * @param {String} id the channel id
 * @param {Object} options
 * @return {Object}
 */
proto.getChannelStatus = function* (id, options) {
  options = options || {};
  options.subres = {
    'live': null,
    'comp': 'stat'
  };

  var params = this._objectRequestParams('GET', id, options);
  params.xmlResponse = true;
  params.successStatuses = [200];

  var result = yield this.request(params);

  return {
    data: result.data,
    res: result.res
  };
};

/**
 * List the channels
 * @param {Object} query the query parameters
 *  filter options:
 *   - prefix: the channel id prefix (returns channels with this prefix)
 *   - marker: the channle id marker (returns channels after this id)
 *   - max-keys: max number of channels to return
 * @param {Object} options
 * @return {Object}
 */
proto.listChannels = function* (query, options) {
  // prefix, marker, max-keys

  options = options || {};
  options.subres = 'live';

  var params = this._objectRequestParams('GET', '', options);
  params.query = query;
  params.xmlResponse = true;
  params.successStatuses = [200];

  var result = yield this.request(params);

  return {
    data: result.data,
    res: result.res
  };
};

/**
 * Get the channel history
 * @param {String} id the channel id
 * @param {Object} options
 * @return {Object}
 */
proto.getChannelHistory = function* (id, options) {
  options = options || {};
  options.subres = {
    'live': null,
    'comp': 'history'
  };

  var params = this._objectRequestParams('GET', id, options);
  params.xmlResponse = true;
  params.successStatuses = [200];

  var result = yield this.request(params);

  return {
    data: result.data,
    res: result.res
  };
};

/**
 * Create vod playlist
 * @param {String} id the channel id
 * @param {String} name the playlist name
 * @param {Object} time the begin and end time
 *  time:
 *   - begin: the begin time in epoch seconds
 *   - end: the end time in epoch seconds
 * @param {Object} options
 * @return {Object}
 */
proto.createVod = function* (id, name, time, options) {
  options = options || {};
  options.subres = 'vod';

  var params = this._objectRequestParams('GET', id + '/' + name, options);
  params.query = time;
  params.successStatuses = [200];

  var result = yield this.request(params);

  return {
    data: result.data,
    res: result.res
  };
};
