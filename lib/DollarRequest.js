"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios2 = _interopRequireDefault(require("axios"));

var _lodash = require("lodash");

var _RequestGuard = _interopRequireDefault(require("./RequestGuard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DollarRequest = /*#__PURE__*/function () {
  // axios 实例化入参，默认值
  // 默认自定义配置
  // 默认拦截器配置
  function DollarRequest(initOptions) {
    var _this = this;

    var adapter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, DollarRequest);

    _defineProperty(this, "defaultAxiosConfigs", {// adapter: mpAdapter // 小程序axios适配器，如果是非小程序，不需要此配置
    });

    _defineProperty(this, "finalAxiosConfigs", {});

    _defineProperty(this, "defaultCustomOptions", {
      showLoading: true
    });

    _defineProperty(this, "interceptors", {
      request: [function (config) {
        return config;
      }, function (error) {
        return Promise.reject(error);
      }],
      response: [function (res) {
        var _res$data = res.data,
            body = _res$data.body,
            errCode = _res$data.errCode;

        if (errCode !== 'e0000') {
          return Promise.reject(res.data);
        }

        return body;
      }, function (error) {
        return Promise.reject(error);
      }]
    });

    _defineProperty(this, "showLoading", function () {
      console.log('showLoading...');
    });

    _defineProperty(this, "hideLoading", function () {
      console.log('hideLoading...');
    });

    _defineProperty(this, "exceptionHandler", null);

    var options = initOptions.options,
        interceptors = initOptions.interceptors,
        urls = initOptions.urls,
        exceptionHandler = initOptions.exceptionHandler,
        showLoading = initOptions.showLoading,
        hideLoading = initOptions.hideLoading;
    this.initOptions = initOptions;
    this.finalAxiosConfigs = Object.assign(this.defaultAxiosConfigs, {
      adapter: adapter
    }, options);
    this.axiosInstance = _axios2.default.create(this.finalAxiosConfigs); // 请求、响应拦截器

    this._useInterceptors(interceptors);

    this.exceptionHandler = exceptionHandler; // use开头的选项都设置为全局的个性化选项

    Object.keys(initOptions).forEach(function (key) {
      if (/^use/.test(key)) {
        _this.defaultCustomOptions[key] = initOptions[key];
      }
    }); // loading\hideLoading 的实现

    showLoading && (this.showLoading = showLoading);
    hideLoading && (this.hideLoading = hideLoading); // urls ->  apis

    return this._useApisGenerator(urls);
  } // 请求、响应拦截器


  _createClass(DollarRequest, [{
    key: "_useInterceptors",
    value: function _useInterceptors(interceptors) {
      var _this2 = this;

      // 请求拦截
      interceptors = (0, _lodash.merge)({}, this.interceptors, interceptors);

      var _interceptors$request = _slicedToArray(interceptors.request, 2),
          request = _interceptors$request[0],
          requestError = _interceptors$request[1];

      var _interceptors$respons = _slicedToArray(interceptors.response, 2),
          responseHandler = _interceptors$respons[0],
          responseError = _interceptors$respons[1];

      this.axiosInstance.interceptors.request.use(function (config) {
        return request(_this2._request(config), _this2);
      }, function (error) {
        return requestError(error, _this2);
      }); // 响应拦截

      this.axiosInstance.interceptors.response.use(function (response) {
        return responseHandler(response, _this2);
      }, function (error) {
        return responseError(error, _this2);
      });
    } // 内置拦截器

  }, {
    key: "_request",
    value: function _request(config) {
      var options = this.initOptions.options || {};
      this.guard = this.guard || new _RequestGuard.default('uni', options.NODE_ENV, this.initOptions.options.whiteList);
      this.guard.check(config);
      return config;
    } // urls ->  apis

  }, {
    key: "_useApisGenerator",
    value: function _useApisGenerator(urls) {
      var _this3 = this;

      return Object.entries(urls).reduce(function (apiObj, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            url = _ref2[1];

        // 通过命名约定，判断请求方法，默认get请求
        var method = ['get', 'post', 'put', 'delete'].find(function (m) {
          return name.startsWith(m);
        }) || 'get';

        apiObj[name] = /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload, onError) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                        var _this3$resolvePayload, requestParams, axiosConfigs, customOptions, form, useMock, res;

                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _this3$resolvePayload = _this3.resolvePayload(payload), requestParams = _this3$resolvePayload.requestParams, axiosConfigs = _this3$resolvePayload.axiosConfigs, customOptions = _this3$resolvePayload.customOptions; // 自定义配置： showLoading 、isFormData

                                customOptions.showLoading && _this3.showLoading(); // 处理入参是formData

                                if (customOptions.isFormData) {
                                  form = new FormData();
                                  Object.entries(requestParams).forEach(function (_ref5) {
                                    var _ref6 = _slicedToArray(_ref5, 2),
                                        key = _ref6[0],
                                        value = _ref6[1];

                                    form.append(key, value);
                                  });
                                  requestParams = form;
                                } // 开启缓存


                                if (customOptions.useCache) {// TODO: 判断入参，相同的入参且缓存有数据，直接拿本地缓存的数据
                                } // 开启接口mock


                                if (customOptions.useMock && customOptions.useMock.mode !== 'off') {
                                  useMock = !customOptions.useMock.includes || customOptions.useMock.includes.includes(name);

                                  if (useMock) {
                                    axiosConfigs.adapter = _this3.fetchServerData(customOptions.useMock.server, name);
                                  }
                                }

                                _context.prev = 5;
                                _context.next = 8;
                                return _this3.axiosInstance[method](url, requestParams, axiosConfigs);

                              case 8:
                                res = _context.sent;
                                customOptions.showLoading && _this3.hideLoading();
                                resolve(res);
                                _context.next = 25;
                                break;

                              case 13:
                                _context.prev = 13;
                                _context.t0 = _context["catch"](5);
                                customOptions.showLoading && _this3.hideLoading();

                                if (!onError) {
                                  _context.next = 21;
                                  break;
                                }

                                _context.next = 19;
                                return onError(_context.t0, resolve);

                              case 19:
                                _context.next = 25;
                                break;

                              case 21:
                                _context.t1 = typeof _this3.exceptionHandler === 'function';

                                if (!_context.t1) {
                                  _context.next = 25;
                                  break;
                                }

                                _context.next = 25;
                                return _this3.exceptionHandler(_context.t0, resolve);

                              case 25:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee, null, [[5, 13]]);
                      }));

                      return function (_x3) {
                        return _ref4.apply(this, arguments);
                      };
                    }()));

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x, _x2) {
            return _ref3.apply(this, arguments);
          };
        }();

        return apiObj;
      }, {});
    }
    /** 参数解析
     * $开头，解析为请求的config，同axios的config
     * _开头，解析为请求的自定义配置项，自定义配置支持列表见useXXXX
     * 其它：接口请求的真实参数
     */

  }, {
    key: "resolvePayload",
    value: function resolvePayload(payload) {
      var requestParams = {};
      var axiosConfigs = Object.assign({}, this.defaultAxiosConfigs);
      var customOptions = Object.assign({}, this.defaultCustomOptions);
      Object.keys(payload || {}).forEach(function (key) {
        if (/^\$/.test(key)) {
          // is option
          axiosConfigs[key.replace('$', '')] = payload[key];
        } else if (/^_/.test(key)) {
          // is config
          customOptions[key.replace('_', '')] = payload[key];
        } else {
          // is params
          requestParams[key] = payload[key];
        }
      });
      return {
        requestParams: requestParams,
        axiosConfigs: axiosConfigs,
        customOptions: customOptions
      };
    }
  }, {
    key: "fetchServerData",
    value: function fetchServerData(mockServer, apiName) {
      var _this4 = this;

      this.axiosForMock = this.axiosForMock || _axios2.default.create(this.finalAxiosConfigs);
      return /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(rConfig) {
          var url;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  url = "".concat(mockServer, "/").concat(apiName);
                  rConfig.url = url;
                  delete rConfig.adapter;
                  return _context3.abrupt("return", _this4.axiosForMock(rConfig));

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x4) {
          return _ref7.apply(this, arguments);
        };
      }();
    }
  }]);

  return DollarRequest;
}();

exports.default = DollarRequest;