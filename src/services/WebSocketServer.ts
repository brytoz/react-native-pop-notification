import TcpSocket from "react-native-tcp-socket";
import EventEmitter from 'eventemitter3';

export interface NotificationServerConfig {
  port?: number;
  validateToken?: (token: string) => boolean;
  onNotification?: (data: any) => void;
  reconnectAttempts?: number;
}

class WebSocketServer {
  private server: TcpSocket.Server | null = null;
  private isRunning = false;
  private config: NotificationServerConfig = {};
  private PORT = 8081;
  private eventEmitter = new EventEmitter();

  setConfig(config: NotificationServerConfig) {
    this.config = config;
  }

  startServer(port: number = this.PORT) {
    if (this.isRunning) return;
    this.isRunning = true;

    this.server = TcpSocket.createServer((socket: any) => {
      console.log("Client connected");

      socket.on("data", (data: any) => {
        const message = data.toString();
        try {
          const { type, token, content } = JSON.parse(message);

          if (this.config.validateToken && !this.config.validateToken(token)) {
            socket.write(JSON.stringify({ error: "Invalid token" }));
            return;
          }

          if (type === "notification") {
            this.eventEmitter.emit("remoteNotification", content);
          }
        } catch (error) {
          console.error("Invalid message format", error);
        }
      });

      socket.on("close", () => console.log("Client disconnected"));
      socket.on("error", (error: unknown) => console.error("Socket error:", error));
    });

    this.server.listen({ port, host: "0.0.0.0", reuseAddress: true }, () => {
      console.log(`WebSocket Server running on port ${port}`);
    });
  }

  stopServer() {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.server?.close();
  }

  onRemoteNotification(callback: (data: any) => void) {
    this.eventEmitter.on("remoteNotification", callback);
  }
}

const webSocketServer = new WebSocketServer();
export default webSocketServer;
export const { startServer, stopServer, onRemoteNotification } = webSocketServer;
