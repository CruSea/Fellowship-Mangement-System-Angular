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
    return this.httpClient.get('http://localhost:8000/api/contacts')
  }

  delete(id: string) {
    return this.httpClient.delete(`http:localhost:8000/api/contacts/${id}`)
  }
}
