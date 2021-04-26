import { Component } from '@angular/core';
import { ChatService } from "./services/chat.service";
import { SocketioService } from "./services/socketio.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'algo-logi-ng';

  constructor( 
    private chatService : ChatService,
    private socketService: SocketioService
  ) {}

  ngOnInit() {
    // this.socketService.setupSocketConnection();
  }
}
