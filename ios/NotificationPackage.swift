import Foundation
import React

@objc(NotificationPackage)
class NotificationPackage: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    return "NotificationModule"
  }
  
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}