"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _WebSocketServer = require("../services/WebSocketServer");
var _LocalNotificationManager = require("../services/LocalNotificationManager");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var NotificationPopup = function NotificationPopup() {
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    notification = _useState2[0],
    setNotification = _useState2[1];
  var _useState3 = (0, _react.useState)(new _reactNative.Animated.Value(0)),
    _useState4 = _slicedToArray(_useState3, 1),
    fadeAnim = _useState4[0];
  (0, _react.useEffect)(function () {
    (0, _LocalNotificationManager.onLocalNotification)(setNotification);
    (0, _WebSocketServer.onRemoteNotification)(setNotification);
  }, []);
  if (!notification) return null;
  var handlePress = function handlePress() {
    if (notification.actionLink) {
      _reactNative.Linking.openURL(notification.actionLink)["catch"](function (err) {
        return console.error("Failed to open link:", err);
      });
    }
    setNotification(null);
  };
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.container, {
      opacity: fadeAnim
    }]
  }, notification.image && /*#__PURE__*/React.createElement(_reactNative.Image, {
    source: {
      uri: notification.image
    },
    style: styles.image
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.title
  }, notification.title), /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.message
  }, notification.message)), /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    onPress: handlePress,
    style: styles.button
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: {
      color: "blue",
      fontWeight: "bold"
    }
  }, "Open")));
};
var styles = _reactNative.StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10
  },
  title: {
    fontWeight: "bold",
    fontSize: 16
  },
  message: {
    fontSize: 14,
    color: "gray"
  },
  button: {
    marginLeft: 10
  }
});
var _default = exports["default"] = NotificationPopup;