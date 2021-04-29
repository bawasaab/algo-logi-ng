import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);

    // <ngx-spinner></ngx-spinner>

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      // first_name: ['', [Validators.required]],
      // last_name: ['', [Validators.required]]
    });
  }

  goToSignIn() {
    this.router.navigate(['/auth/signin']);
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
    
    /*
    this.loginService.signup( in_data )
      .subscribe(
        result => {
          this.spinner.hide();
          console.log('result', result);
          if( result.status == 200 ) {

            localStorage.setItem( 'checkoutEmail', result.data.rows.email );
            localStorage.setItem( 'checkoutUserId', result.data.rows._id );

            Swal.fire(
              'success',
              result.msg,
              result.msg
              );
            this.router.navigate(['/trailOrCheckout']);
          } else {
            Swal.fire(
              'error',
              result.msg,
              result.msg
            );
          }
        },
        error => {
          this.spinner.hide();
          console.log('error');
          console.log(error);
          Swal.fire(
            'error',
            error,
            error
          );
        }
    );
    */
  }
}
