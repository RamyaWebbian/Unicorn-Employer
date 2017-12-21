import { Injectable } from '@angular/core';
// import { Headers, RequestOptions, Response } from '@angular/http';
//import { Router } from '@angular/router';
 import { Observable } from 'rxjs/Observable';
 import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/Rx';
// import {UserService} from './user.service';

@Injectable()
export class MemoryStorage {
 
  private _key: string;
  private storeArray: Array<any> = [];

   private subjectStorage: Subject<any> = new Subject<any>();

  constructor() {

  }

  setItem(key: string, value: any): void {
    this.storeArray[key] = value;
     console.log(this.storeArray)
    this.subjectStorage.next(this.storeArray);
  }

  getItem(key:string): any {
var item = this.storeArray[key];
 console.log(this.storeArray)
//return item;
 this.subjectStorage.next(item);
return this.subjectStorage.asObservable();
  }

removeItem(key){
     //this.storeArray[key]
      this.storeArray.splice(key, 1); 
      console.log(this.storeArray)
     // this.subjectStorage.next(this.storeArray);
}

clear(){
    this.storeArray.length = 0; 
    // this.subjectStorage.next();
}

}
