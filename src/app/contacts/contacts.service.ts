import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
      private  httpClient: HttpClient
  ) { }

  collectionofContacts() {
    return this.httpClient.get('http://localhost:3232/api/contacts')
  }

  delete(id: string) {
    return this.httpClient.delete(`http:localhost:3232/api/contacts/${id}`)
  }
}
