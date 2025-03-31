import WebSocketServer from './services/WebSocketServer';
import { onLocalNotification, triggerLocalNotification } from './services/LocalNotificationManager';
import NotificationPopup from './components/NotificationPopup';

export { NotificationPopup };

export const startNotificationServer = (config = {}) => {
  WebSocketServer.setConfig(config);
  WebSocketServer.startServer(8081);
//   WebSocketServer.startServer(config.port || 8081);
};

export const stopNotificationServer = () => {
  WebSocketServer.stopServer();
};

export const onRemoteNotification = (callback: (data: any) => void) => {
  WebSocketServer.onRemoteNotification(callback);
};

export { onLocalNotification, triggerLocalNotification };
