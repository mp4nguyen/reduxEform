'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClick = function (e) {
      e.preventDefault();
      _CSSCore2.default.addClass(_this.toastrButton, 'active');
      /*
       * In order to avoid event bubbling we need to call the onClick callback
       * after we have remove the css class 'active' that contains the animation
       */
      var end = function end() {
        _CSSCore2.default.removeClass(_this.toastrButton, 'active');
        if (_this.props.onClick) {
          _this.props.onClick && _this.props.onClick();
        }
      };
      (0, _utils.onCSSTransitionEnd)(_this.toastrButton, end);
    };

    return _this;
  }

  Button.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'button',
      {
        ref: function ref(_ref) {
          return _this2.toastrButton = _ref;
        },
        type: 'button',
        onClick: function onClick(e) {
          return _this2.handleClick(e);
        } },
      _react2.default.createElement(
        'p',
        null,
        this.props.children
      )
    );
  };

  return Button;
}(_react.Component);

Button.displayName = 'ReduxConfirmButton';
exports.default = Button;