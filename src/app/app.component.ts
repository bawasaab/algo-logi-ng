import { Component } from '@angular/core';
import { ChatService } from "./services/chat.service";
import { SocketioService } from "./services/socketio.service";
import { NgxSpinnerService } from "ngx-spinner";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'algo-logi-ng';

  signupForm: FormGroup;
  submitted = false;

  constructor( 
    private chatService : ChatService,
    private socketService: SocketioService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
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

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      // first_name: ['', [Validators.required]],
      // last_name: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log( 'this.signupForm.invalid', this.signupForm.invalid );
    // stop here if form is invalid
    // if (this.signupForm.invalid) {
    //   return;
    // }

    let in_data = this.signupForm.value;
    in_data.email = in_data.email.toLowerCase();
    console.log('in_data', in_data);
  }
}
