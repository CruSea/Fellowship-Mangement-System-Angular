import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(
      private httpClient: HttpClient
  ) { }

  collectionOfUsers() {
        return this.httpClient.get('http://localhost:3232/api/users')
  }

  delete(id: string) {
    return this.httpClient.delete(`http://localhost:3232/api/user/${id}`)
  }
}
