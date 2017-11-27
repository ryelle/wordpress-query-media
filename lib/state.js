'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MEDIA_REQUEST_FAILURE = exports.MEDIA_REQUEST_SUCCESS = exports.MEDIA_REQUEST = undefined;
exports.requestMedia = requestMedia;

var _redux = require('redux');

var _wordpressRestApiOauth = require('wordpress-rest-api-oauth-1');

var _wordpressRestApiOauth2 = _interopRequireDefault(_wordpressRestApiOauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*global SiteSettings */
/**
 * External dependencies
 */


var api = new _wordpressRestApiOauth2.default({
	url: SiteSettings.endpoint
});

/**
 * Media actions
 */
var MEDIA_REQUEST = exports.MEDIA_REQUEST = 'wordpress-redux/media/REQUEST';
var MEDIA_REQUEST_SUCCESS = exports.MEDIA_REQUEST_SUCCESS = 'wordpress-redux/media/REQUEST_SUCCESS';
var MEDIA_REQUEST_FAILURE = exports.MEDIA_REQUEST_FAILURE = 'wordpress-redux/media/REQUEST_FAILURE';

/*
 * Tracks all known media objects, indexed by post global ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function items() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case MEDIA_REQUEST_SUCCESS:
			return Object.assign({}, state, _defineProperty({}, action.media.id, action.media));
		default:
			return state;
	}
}

/**
 * Returns the updated media requests state after an action has been
 * dispatched. The state reflects a mapping of attachment ID to a
 * boolean reflecting whether a request for the media is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function requests() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case MEDIA_REQUEST:
		case MEDIA_REQUEST_SUCCESS:
		case MEDIA_REQUEST_FAILURE:
			return Object.assign({}, state, _defineProperty({}, action.attachmentId, MEDIA_REQUEST === action.type));
		default:
			return state;
	}
}

exports.default = (0, _redux.combineReducers)({
	items: items,
	requests: requests
});

/**
 * Triggers a network request to fetch a specific media item from a site.
 *
 * @param  {number}   attachmentId  Attachment ID
 * @return {Function}               Action thunk
 */

function requestMedia(attachmentId) {
	return function (dispatch) {
		dispatch({
			type: MEDIA_REQUEST,
			attachmentId: attachmentId
		});

		var query = {
			_embed: true
		};

		api.get('/wp/v2/media/' + attachmentId, query).then(function (media) {
			dispatch({
				type: MEDIA_REQUEST_SUCCESS,
				attachmentId: attachmentId,
				media: media
			});
			return null;
		}).catch(function (error) {
			dispatch({
				type: MEDIA_REQUEST_FAILURE,
				attachmentId: attachmentId,
				error: error
			});
		});
	};
}