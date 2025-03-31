import Foundation
import React

@objc(NotificationModule)
class NotificationModule: RCTEventEmitter {
  private static var emitter: NotificationModule?
  
  override init() {
    super.init()
    NotificationModule.emitter = self
  }
  
  @objc override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func supportedEvents() -> [String]! {
    return ["RemoteNotification"]
  }
  
  @objc func emitEvent(_ name: String, body: Any) {
    sendEvent(withName: name, body: body)
  }
  
  @objc static func sendEvent(_ name: String, body: Any) {
    emitter?.sendEvent(withName: name, body: body)
  }
}