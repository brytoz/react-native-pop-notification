"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NotificationPopup", {
  enumerable: true,
  get: function get() {
    return _NotificationPopup["default"];
  }
});
Object.defineProperty(exports, "onLocalNotification", {
  enumerable: true,
  get: function get() {
    return _LocalNotificationManager.onLocalNotification;
  }
});
exports.stopNotificationServer = exports.startNotificationServer = exports.onRemoteNotification = void 0;
Object.defineProperty(exports, "triggerLocalNotification", {
  enumerable: true,
  get: function get() {
    return _LocalNotificationManager.triggerLocalNotification;
  }
});
var _WebSocketServer = _interopRequireDefault(require("./services/WebSocketServer"));
var _LocalNotificationManager = require("./services/LocalNotificationManager");
var _NotificationPopup = _interopRequireDefault(require("./components/NotificationPopup"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var startNotificationServer = exports.startNotificationServer = function startNotificationServer() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  _WebSocketServer["default"].setConfig(config);
  _WebSocketServer["default"].startServer(8081);
  //   WebSocketServer.startServer(config.port || 8081);
};
var stopNotificationServer = exports.stopNotificationServer = function stopNotificationServer() {
  _WebSocketServer["default"].stopServer();
};
var onRemoteNotification = exports.onRemoteNotification = function onRemoteNotification(callback) {
  _WebSocketServer["default"].onRemoteNotification(callback);
};