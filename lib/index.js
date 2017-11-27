'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _selectors = require('./selectors');

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Internal dependencies
 */


var debug = (0, _debug2.default)('query:media');

var QueryMedia = function (_Component) {
	_inherits(QueryMedia, _Component);

	function QueryMedia() {
		_classCallCheck(this, QueryMedia);

		return _possibleConstructorReturn(this, (QueryMedia.__proto__ || Object.getPrototypeOf(QueryMedia)).apply(this, arguments));
	}

	_createClass(QueryMedia, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.request(this.props);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.attachmentId === nextProps.attachmentId) {
				return;
			}

			this.request(nextProps);
		}
	}, {
		key: 'request',
		value: function request(props) {
			if (!props.requestingMedia) {
				debug('Request media item ' + props.attachmentId);
				props.requestMedia(props.attachmentId);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return QueryMedia;
}(_react.Component);

QueryMedia.propTypes = {
	attachmentId: _propTypes2.default.number.isRequired,
	requestingMedia: _propTypes2.default.bool,
	requestMedia: _propTypes2.default.func
};

QueryMedia.defaultProps = {
	requestMedia: function requestMedia() {}
};

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	var attachmentId = ownProps.attachmentId;
	return {
		requesting: (0, _selectors.isRequestingMedia)(state, attachmentId)
	};
}, function (dispatch) {
	return (0, _redux.bindActionCreators)({ requestMedia: _state.requestMedia }, dispatch);
})(QueryMedia);