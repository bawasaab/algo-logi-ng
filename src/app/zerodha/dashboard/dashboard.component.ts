import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketioService } from "../../services/socketio.service";
import { InstrumentsService } from "../../services/instruments.service";
import { $, element } from 'protractor';
import { NgForm } from '@angular/forms'; 

import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("searchIdHtml") searchNameNg: ElementRef;
  @ViewChild("changePercentIdHtml") changePercentNg: ElementRef;

  public tick = [
    {tradable: true, mode: "quote", instrument_token: 4600577, last_price: 344.8, last_quantity: 10, change: 2},
    {tradable: true, mode: "quote", instrument_token: 424961, last_price: 588.7, last_quantity: 10,  change: 3},
    {tradable: true, mode: "quote", instrument_token: 340481, last_price: 588.7, last_quantity: 10,  change: 3},
  ]

  public showResultDivFlag = false;
  public socketTickData;
  public sbi;
  public icici;
  public sbiFlag = false;
  public searchedData = [];
  public userWatchListData = [];
  public socketUserWatchListData = {};
  public change = 0;

  public source = interval(1000);

  constructor( 
    private SocketioService : SocketioService,
    private InstrumentsService : InstrumentsService
  ) {
    console.log('inside getUserWatchList');
  }

  ngOnInit(): void {
    
    this.getUserWatchList();    
  }

  searchInstruments( str ) {
    console.log('str', str);
    if( str.length >= 3 ) {
      
      this.InstrumentsService.searchInstruments( str ).subscribe( ( result ) => {
        this.showResultDivFlag = true;
        console.log('result', result);
        this.searchedData = result.data;
        console.log('this.searchedData', this.searchedData);
      } );
    }
  }

  hideResultDiv() {
    this.searchNameNg.nativeElement.value = '';
    this.showResultDivFlag = false;
  }

  myFunctions() {
    this.showResultDivFlag = true;
  }

  addInstrumentToWatchList( instrument_token ) {

    console.log('instrument_token', instrument_token);
    this.InstrumentsService.addInstrumentToWatchList( instrument_token ).subscribe( (result) => {
      console.log('result', result);
      this.getUserWatchList();
    } );
  }

  getUserWatchList() {

    let $this = this;
    this.InstrumentsService.getUserWatchList().subscribe( ( result ) => {
      console.log('result', result);
      this.userWatchListData = result.data;

      this.userWatchListData.forEach( (element) => {

        let instrument_token = element.instrument_token;
        this.socketUserWatchListData[instrument_token] = {
          last_price : 0,
          change : 0
        };
      } );
      $this.initSockets();
    } );
  }

  initSockets() {
    this.SocketioService.setupSocketConnection();

    // SBIN // 779521
    // ICICI // 1270529

    this.SocketioService.sbi$.subscribe( (data) => {

      this.sbiFlag = true;
      this.socketTickData = data;
      console.log('inside sbi dashboard', this.socketTickData[0].last_price);
      console.log('data', data);
      // this.changePercentNg.nativeElement.InnerHTML = this.socketTickData[0].last_price;

      this.socketTickData.forEach(element => {
        
        this.socketUserWatchListData[element.instrument_token] = {
          last_price : element.last_price,
          change : element.change
        };

        this.change = element.change;
      });
      console.log('this.socketUserWatchListData', this.socketUserWatchListData);
      // this.searchInstruments('sbi');
    } );
  }

  initSocketsFake() {
      this.source.subscribe( (val) => {
        console.log('this.tick[0].last_price', this.tick[0].last_price);
        console.log('this.tick', this.tick);

        this.tick.forEach(element => {
          
          let minPrice = 100;
          let maxPrice = 300;

          let minChange = 0.1;
          let maxChange = 10;

          this.socketUserWatchListData[element.instrument_token] = {
            last_price : Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice,
            change : Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange
          };
  
          this.change = element.change;
        });

        console.log('this.socketUserWatchListData', this.socketUserWatchListData);
      } );
  }

  onSubmit(value:any){  
    console.log(value);  

  }  
}
