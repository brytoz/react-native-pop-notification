// import  EventEmitter from "node:events";
import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

export const triggerLocalNotification = (notification: any) => {
  eventEmitter.emit("localNotification", notification);
};

export const onLocalNotification = (callback: (data: any) => void) => {
  eventEmitter.on("localNotification", callback);
};
