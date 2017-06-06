import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private _http: Http) { }

  getEvents(): Observable<any> {
    return this._http.get('/events').map(res => res.json());
  }

  getEventsCategory(): Observable<any> {
    return this._http.get('/eventsCategory').map(res => res.json());
  }

  getNews(): Observable<any> {
    return this._http.get('/news').map(res => res.json());
  }

  getTrainers(): Observable<any> {
    return this._http.get('/trainers').map(res => res.json());
  }
}
