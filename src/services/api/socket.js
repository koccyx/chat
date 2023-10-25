import UserSlice, {MessageSlice} from '../store/state/UserSlice';
import { useDispatch } from 'react-redux';


export default class Socket {
  static socket;
  static observer;
  static connect(token) {
    this.socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
    this.socket.onopen = () => {
      this.socket.addEventListener('message', this.observer);
      console.log('open');
    };
    this.socket.onclose = () => {
      console.log('close');
      this.connect(token);
    };
  }
  static send(text) {
    this.socket.send(JSON.stringify({'text': text}));
  }
  static close() {
    this.socket.close(1000, 'Closed by client');
  }
  static addEvent(callback) {
    this.observer = (e) => {
      callback(e.data);
    };
    this.socket.addEventListener('message', this.observer);
  }
}