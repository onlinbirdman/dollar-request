"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axiosMiniprogramAdapter = _interopRequireDefault(require("axios-miniprogram-adapter"));

var _DollarRequest = _interopRequireDefault(require("./DollarRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = function _default(options) {
  _classCallCheck(this, _default);

  options.adapter = _axiosMiniprogramAdapter.default;
  return new _DollarRequest.default(options, _axiosMiniprogramAdapter.default);
};

exports.default = _default;