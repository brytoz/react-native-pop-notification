"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerLocalNotification = exports.onLocalNotification = void 0;
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import  EventEmitter from "node:events";

var eventEmitter = new _eventemitter["default"]();
var triggerLocalNotification = exports.triggerLocalNotification = function triggerLocalNotification(notification) {
  eventEmitter.emit("localNotification", notification);
};
var onLocalNotification = exports.onLocalNotification = function onLocalNotification(callback) {
  eventEmitter.on("localNotification", callback);
};