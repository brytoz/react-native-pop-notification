"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopServer = exports.startServer = exports.onRemoteNotification = exports["default"] = void 0;
var _reactNativeTcpSocket = _interopRequireDefault(require("react-native-tcp-socket"));
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var WebSocketServer = /*#__PURE__*/function () {
  function WebSocketServer() {
    _classCallCheck(this, WebSocketServer);
    _defineProperty(this, "server", null);
    _defineProperty(this, "isRunning", false);
    _defineProperty(this, "config", {});
    _defineProperty(this, "PORT", 8081);
    _defineProperty(this, "eventEmitter", new _eventemitter["default"]());
  }
  return _createClass(WebSocketServer, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.config = config;
    }
  }, {
    key: "startServer",
    value: function startServer() {
      var _this = this;
      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.PORT;
      if (this.isRunning) return;
      this.isRunning = true;
      this.server = _reactNativeTcpSocket["default"].createServer(function (socket) {
        console.log("Client connected");
        socket.on("data", function (data) {
          var message = data.toString();
          try {
            var _JSON$parse = JSON.parse(message),
              type = _JSON$parse.type,
              token = _JSON$parse.token,
              content = _JSON$parse.content;
            if (_this.config.validateToken && !_this.config.validateToken(token)) {
              socket.write(JSON.stringify({
                error: "Invalid token"
              }));
              return;
            }
            if (type === "notification") {
              _this.eventEmitter.emit("remoteNotification", content);
            }
          } catch (error) {
            console.error("Invalid message format", error);
          }
        });
        socket.on("close", function () {
          return console.log("Client disconnected");
        });
        socket.on("error", function (error) {
          return console.error("Socket error:", error);
        });
      });
      this.server.listen({
        port: port,
        host: "0.0.0.0",
        reuseAddress: true
      }, function () {
        console.log("WebSocket Server running on port ".concat(port));
      });
    }
  }, {
    key: "stopServer",
    value: function stopServer() {
      var _this$server;
      if (!this.isRunning) return;
      this.isRunning = false;
      (_this$server = this.server) === null || _this$server === void 0 || _this$server.close();
    }
  }, {
    key: "onRemoteNotification",
    value: function onRemoteNotification(callback) {
      this.eventEmitter.on("remoteNotification", callback);
    }
  }]);
}();
var webSocketServer = new WebSocketServer();
var _default = exports["default"] = webSocketServer;
var startServer = exports.startServer = webSocketServer.startServer,
  stopServer = exports.stopServer = webSocketServer.stopServer,
  onRemoteNotification = exports.onRemoteNotification = webSocketServer.onRemoteNotification;