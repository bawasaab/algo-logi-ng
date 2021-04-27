import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { io } from 'socket.io-client';
import { Subject, Observable } from 'rxjs';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;
  public sbi;

  public sbi$ = new Subject();

  constructor() {
    this.sbi$.asObservable();
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    console.log( 'this.socket', this.socket );

    this.socket.emit('message', 'Hello there from Angular.');
    
    this.socket.on( 'message', ( data ) => {
      this.sbi = data;
    } );

    this.socket.on( 'tick', ( data ) => {
      console.log('tick data', data);
      this.sbi$.next( data );
    } );
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    // return this.socket.fromEvent('message').pipe(map((data) => data.msg));
    return this.socket.fromEvent('message').pipe(map((data) => console.log( 'data', data) ));
  }
}
