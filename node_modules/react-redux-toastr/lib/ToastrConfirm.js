'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _utils = require('./utils');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ToastrConfirm = function (_Component) {
  _inherits(ToastrConfirm, _Component);

  function ToastrConfirm(props) {
    _classCallCheck(this, ToastrConfirm);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this._setTransition = function (add) {
      var body = document.querySelector('body');

      if (add) {
        _this.isHiding = false;
        _CSSCore2.default.addClass(body, 'toastr-confirm-active');
        _CSSCore2.default.addClass(_this.confirm, 'bounceInDown');
        return;
      }

      _this.isHiding = true;
      _CSSCore2.default.addClass(_this.confirm, 'bounceOutUp');
    };

    _this._removeConfirm = function () {
      _this.isHiding = false;
      _this.props.hideConfirm();
      var body = document.querySelector('body');
      _CSSCore2.default.removeClass(_this.confirm, 'bounceOutUp');
      _CSSCore2.default.removeClass(_this.confirm, 'bounceInDown');
      _CSSCore2.default.removeClass(body, 'toastr-confirm-active');
    };

    return _this;
  }

  ToastrConfirm.prototype.componentDidUpdate = function componentDidUpdate() {
    this.isHiding = false;

    if (this.props.confirm.show) {
      this._setTransition(true);
    }
  };

  ToastrConfirm.prototype.handleConfirmClick = function handleConfirmClick() {
    var _this2 = this;

    var options = this.props.confirm.options;

    var onAnimationEnd = function onAnimationEnd() {
      _this2._removeConfirm();
      if (options && options.onOk) {
        options.onOk();
      }
    };

    this._setTransition();
    (0, _utils.onCSSTransitionEnd)(this.confirm, onAnimationEnd);
  };

  ToastrConfirm.prototype.handleCancelClick = function handleCancelClick() {
    var _this3 = this;

    var options = this.props.confirm.options;

    var onAnimationEnd = function onAnimationEnd() {
      _this3._removeConfirm();
      if (options && options.onCancel) {
        options.onCancel();
      }
    };

    this._setTransition();
    (0, _utils.onCSSTransitionEnd)(this.confirm, onAnimationEnd);
  };

  ToastrConfirm.prototype.render = function render() {
    var _this4 = this;

    var classes = (0, _classnames2.default)('confirm-holder', { active: this.props.confirm.show });
    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement(
        'div',
        { className: 'confirm animated', ref: function ref(_ref) {
            return _this4.confirm = _ref;
          } },
        _react2.default.createElement(
          'div',
          { className: 'message' },
          this.props.confirm.message
        ),
        _react2.default.createElement(
          _Button2.default,
          { onClick: this.handleConfirmClick.bind(this) },
          this.props.confirmOptions.okText
        ),
        _react2.default.createElement(
          _Button2.default,
          { onClick: this.handleCancelClick.bind(this) },
          this.props.confirmOptions.cancelText
        )
      ),
      _react2.default.createElement('div', { className: 'shadow' })
    );
  };

  return ToastrConfirm;
}(_react.Component);

ToastrConfirm.displayName = 'ToastrConfirm';
ToastrConfirm.propTypes = {
  confirm: _react.PropTypes.object.isRequired,
  confirmOptions: _react.PropTypes.object
};
exports.default = ToastrConfirm;