"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RequestGuard = /*#__PURE__*/function () {
  // 生产接口白名单
  function RequestGuard(channel) {
    var _this$whiteList;

    var NODE_ENV = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'production';
    var whiteList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, RequestGuard);

    _defineProperty(this, "whiteList", []);

    _defineProperty(this, "blackList", ['www.mdollar.cn']);

    _defineProperty(this, "warningTimes", 0);

    this.channel = channel;
    this.NODE_ENV = NODE_ENV;

    (_this$whiteList = this.whiteList).push.apply(_this$whiteList, _toConsumableArray(whiteList));
  }

  _createClass(RequestGuard, [{
    key: "check",
    value: function check(_ref) {
      var _this = this;

      var baseURL = _ref.baseURL,
          url = _ref.url;
      var urlIsTarget = /^http/.test(url);
      var checkTarget = urlIsTarget ? url : baseURL;

      var domainCheck = function domainCheck() {
        var i = 0; // 一旦匹配为黑名单，校验不通过

        if (_this.blackList.some(function (item) {
          return checkTarget.indexOf(item) !== -1;
        })) {
          return false;
        }

        do {
          var whiteItem = _this.whiteList[i];
          if (checkTarget.indexOf(whiteItem) !== -1) return true; // 一旦找到白名单里面有，域名校验通过

          i++;
        } while (i < _this.whiteList.length);

        return false;
      };

      if (!domainCheck()) return this.showWarning("\u63A5\u53E3\u57DF\u540D\u3010".concat(checkTarget, "\u3011\u4E3A\u975E\u751F\u4EA7\u57DF\u540D\uFF0C\u8BF7\u52FF\u4E0A\u751F\u4EA7\uFF01"));
      if (this.NODE_ENV !== 'production') return this.showWarning("\u5F53\u524D\u7F16\u8BD1\u73AF\u5883\u3010".concat(this.NODE_ENV, "\u3011\u4E3A\u975E\u751F\u4EA7\u73AF\u5883\uFF0C\u8BF7\u52FF\u4E0A\u751F\u4EA7\uFF01"));
    }
  }, {
    key: "showWarning",
    value: function showWarning(wariningMsg) {
      console.warn(wariningMsg);
      if (this.warningTimes > 0) return;
      this.warningTimes++;

      if (this.channel === 'uni') {
        setTimeout(function () {
          (uni.alert || uni.showModal)({
            title: '温馨提示',
            content: '本页面仅供测试或体验',
            success: function success(res) {}
          });
        }, 2000);
      } else {
        try {
          if (!document.getElementById('_warning')) {
            var ele = document.createElement('div');
            ele.id = '_warning';
            ele.innerHTML = "\u672C\u9875\u9762\u4EC5\u4F9B\u6D4B\u8BD5\u4E0E\u4F53\u9A8C";
            ele.style = "\n                    position: fixed;\n                    zIndex: 999;\n                    top: 0;\n                    left:0;\n                    right:0;\n                    color:#fff;\n                    background: rgba(0,0,0, .8);\n                    height:.2rem;\n                    font-size:.16rem;\n                    opacity: 1;\n                    text-align: center;\n                    line-height:.2rem;\n                    ";
            document.body.appendChild(ele);
            setTimeout(function () {
              ele.style = "opacity: 0;height: 0;position: fixed;\n                        zIndex: -1;";
            }, 3000);
          }
        } catch (error) {
          console.error('error', error);
        }
      }
    }
  }]);

  return RequestGuard;
}();

exports.default = RequestGuard;