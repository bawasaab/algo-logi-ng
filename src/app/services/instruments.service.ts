import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class InstrumentsService {

  public currentUser;
  public user_id;
  
  constructor(
    private httpClient: HttpClient
  ) {
    // this.apiEndPoint = this.constantsService.apiBaseUrl +'/coupon';
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id = this.currentUser['user'].id;
  }

  searchInstruments( str ):Observable<any>{
    
    return this.httpClient.get( 
      `http://localhost:3000/zerodha/getInstruments?str=${str}`
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
    );
  }

  addInstrumentToWatchList( instrument_token ):Observable<any>{

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let user_id = this.user_id;

    let body = new HttpParams()
    .set('user_id', user_id)
    .set('instrument_token', instrument_token); 

    return this.httpClient.post( 
      `http://localhost:3000/zerodha/add-watchlist`,
      body
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
    );
  }

  getUserWatchList():Observable<any>{
    return this.httpClient.get( 
      `http://localhost:3000/zerodha/getUserWatchList?user_id=${this.user_id}`
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
    );
  }
}
