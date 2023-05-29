import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SocketAlertService {
 
  public socketStatus = false;
  
  constructor(private socket: Socket) {
    this.checkStatus();
  }

  getAlertCommentary() {
    return this.socket.fromEvent('commentary').pipe(map((data) => data));
  }

  getAlertProjectFinish() {
    return this.socket.fromEvent('project').pipe(map((data) => data));
  }

  checkStatus() {
    this.socket.on('connect', () =>{
      this.socketStatus = true;
    })

    this.socket.on('disconnect', () =>{
      this.socketStatus = false;
    })
  }
}
