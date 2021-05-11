import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  goToSignUp() {
    this.router.navigate(['/auth/signup']);
  }

  goToSignDashboard() {
    this.router.navigate(['/zerodha/dashboard']);
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    
    this.submitted = true;
    console.log( 'this.loginForm.invalid', this.loginForm.invalid );
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    let in_data = this.loginForm.value;
    in_data.email = in_data.email.toLowerCase();
    console.log('in_data', in_data);
    
    this.spinner.show();
    this.authService.signIn( in_data )
      .subscribe(
        result => {
          this.spinner.hide();
          console.log('result', result);
          if( result.resCode == 200 ) {

            localStorage.clear();
            localStorage.setItem('currentUser', JSON.stringify({ 
              token: result.data.token,
              user: result.data.user
            }));
              Swal.fire(
                'Success!',
                'Sign In successfull',
                'success'
              );
              this.goToSignDashboard();
          } else {
            console.log('inside else ');
            Swal.fire(
              'Error!',
              result.msg,
              'error',
            );
          }
        },
        error => {
          this.spinner.hide();
          console.log('error');
          console.log(error);
          Swal.fire(
            'Error!',
            error,
            'error',
          );
        }
    );
  }
}
