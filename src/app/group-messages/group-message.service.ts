import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupMessageService {

  constructor(private http: Http) { }
  postGraduateTeamMessage(port_name: string, team: string, message: string) {
  	return this.http.post('http://localhost/8000/api/post-graduate-team-message', 
  		{port_name: port_name, team: team, message: message},
  		{headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
  }
}
