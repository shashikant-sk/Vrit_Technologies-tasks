export type WebSocketMessage = {
  type: 'stdout' | 'stderr' | 'run' | 'input';
  data?: string;
  message?: string;
  input_data?: string;
}

export class WebSocketService {
  private ws: WebSocket | null = null;
  private messageCallbacks: ((data: WebSocketMessage) => void)[] = [];

  connect() {
    this.ws = new WebSocket('wss://compiler.skillshikshya.com/ws/compiler/');
    
    this.ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageCallbacks.forEach(callback => callback(data));
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
      // Attempt to reconnect after 3 seconds
      setTimeout(() => this.connect(), 3000);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  onMessage(callback: (data: WebSocketMessage) => void) {
    this.messageCallbacks.push(callback);
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    };
  }

  runCode(code: string, language: string, input: string = '') {
    this.send({
      command: 'run',
      code,
      language,
      input
    });
  }

  stopCode() {
    this.send({
      command: 'stop'
    });
  }

  sendInput(input: string) {
    this.send({
      command: 'input',
      input
    });
  }
}

export const websocketService = new WebSocketService();

