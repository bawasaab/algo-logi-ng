import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) {
    // this.apiEndPoint = this.constantsService.apiBaseUrl +'/coupon';
  }

  signUp( in_data ):Observable<any>{

    let body = new HttpParams()
    .set('first_name', in_data.first_name)
    .set('last_name', in_data.last_name)
    .set('email', in_data.email)
    .set('password', in_data.password)
    .set('role', in_data.role);

    return this.httpClient.post( 
      `http://localhost:3000/auth/signup`,
      body
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
    );
  }

  signIn( in_data ):Observable<any>{

    let body = new HttpParams()
    .set('email', in_data.email)
    .set('password', in_data.password);

    return this.httpClient.post( 
      `http://localhost:3000/auth/signin`,
      body
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
    );
  }
}
