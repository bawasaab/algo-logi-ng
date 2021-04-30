import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  signupEnable = true;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  goToSignIn() {
    this.router.navigate(['/auth/signin']);
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  isEmailExists( event: any ) {
    let email = event.target.value;
    console.log('email', email);
    if( email ) {
      this.spinner.show();
      this.authService.isEmailExists( email ).subscribe( ( result ) => {
        this.spinner.hide();
        console.log('result', result);
        
        if( result.resCode == 400 ) {
          this.signupEnable = false;
          Swal.fire(
            'Error!',
            result.msg,
            'error',
          );
        } else {
          this.signupEnable = true;
        }
      },
      error => {
        console.log('inside error');
        this.spinner.hide();
        console.log('error');
        console.log(error);
        Swal.fire(
          'Error!',
          error,
          'error',
        );
      });
    }
  }
  
  onSubmit() {
    
    this.submitted = true;
    console.log( 'this.signupForm.invalid', this.signupForm.invalid );
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    let in_data = this.signupForm.value;
    in_data.email = in_data.email.toLowerCase();
    in_data.role = 'INVESTOR';
    console.log('in_data', in_data);
    
    this.spinner.show();
    this.authService.signUp( in_data )
      .subscribe(
        result => {
          this.spinner.hide();
          console.log('result', result);
          if( result.resCode == 200 ) {

            localStorage.setItem('currentUser', JSON.stringify({ 
              token: result.data.token,
              user: result.data.user
            }));
              Swal.fire(
                'Success!',
                'Sign Up successfull',
                'success'
              );
              this.goToSignIn();
          } else {
            console.log('inside else');
            Swal.fire(
              'Error!',
              result.msg,
              'error',
            );
          }
        },
        error => {
          console.log('inside error');
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
