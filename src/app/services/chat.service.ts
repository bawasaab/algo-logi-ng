import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

// import * as io from 'socket.io-client';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket;

  // constructor(private socket: Socket) {}
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://localhost:3000/');
  }


  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    // return this.socket.fromEvent('message').pipe(map((data) => data.msg));
    return this.socket.fromEvent('message').pipe(map((data) => console.log( 'data', data) ));
  }
}
