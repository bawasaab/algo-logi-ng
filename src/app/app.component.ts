import { Component } from '@angular/core';
import { ChatService } from "./services/chat.service";
import { SocketioService } from "./services/socketio.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'algo-logi-ng';

  constructor( 
    private chatService : ChatService,
    private socketService: SocketioService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // this.socketService.setupSocketConnection();

    /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    // /** spinner ends on init */
  }
}
