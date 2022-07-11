import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  socket : any;
  readonly uri : string = "ws://localhost:8080";

  constructor() { 
    //this.socket = io(this.uri);
  }

  listen(eventName : string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data)=>{
        subscriber.next(data)
      })
    });
  }

  emit(eventName : string, data: any){
    this.socket.emit(eventName,data)
  }
}
