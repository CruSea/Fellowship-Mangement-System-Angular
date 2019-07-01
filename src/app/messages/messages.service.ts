import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
      private httpClient: HttpClient
  ) { }
  
  messages() {
    return this.httpClient.get('http://localhost:3232/api/sentmessages')
  }

  delete(id: string) {
      return this.httpClient.delete(`http:localhost:3232/api/sentmessage/${id}`)
  }

}
