export interface NotificationServerConfig {
    port?: number;
    validateToken?: (token: string) => boolean;
    onNotification?: (data: any) => void;
    reconnectAttempts?: number;
}
declare class WebSocketServer {
    private server;
    private isRunning;
    private config;
    private PORT;
    private eventEmitter;
    setConfig(config: NotificationServerConfig): void;
    startServer(port?: number): void;
    stopServer(): void;
    onRemoteNotification(callback: (data: any) => void): void;
}
declare const webSocketServer: WebSocketServer;
export default webSocketServer;
export declare const startServer: (port?: number) => void, stopServer: () => void, onRemoteNotification: (callback: (data: any) => void) => void;
//# sourceMappingURL=WebSocketServer.d.ts.map