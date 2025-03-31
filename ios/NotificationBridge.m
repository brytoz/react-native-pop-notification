#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(NotificationModule, RCTEventEmitter)
RCT_EXTERN_METHOD(emitEvent:(NSString *)name body:(id)body)
@end