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
    return this.httpClient.get('http://localhost:8000/api/sentmessages')
  }

  patch(id: string) {
      return this.httpClient.delete(`http:localhost:8000/api/message/${id}`)
  }

}
