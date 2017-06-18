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
  addEvent(event): Observable<any> {
    return this._http.post('/events', JSON.stringify(event), this.options);
  }
  editEvent(event): Observable<any> {
    return this._http.put(`/events/${event._id}`, JSON.stringify(event), this.options);
  }
  deleteEvent(event): Observable<any> {
    return this._http.delete(`/events/${event._id}`, this.options);
  }

  getConsulting(): Observable<any> {
    return this._http.get('/consultings').map(res => res.json());
  }
  addConsulting(consulting): Observable<any> {
    return this._http.post('/consultings', JSON.stringify(consulting), this.options);
  }
  editConsulting(consulting): Observable<any> {
    return this._http.put(`/consultings/${consulting._id}`, JSON.stringify(event), this.options);
  }
  deleteConsulting(consulting): Observable<any> {
    return this._http.delete(`/consultings/${consulting._id}`, this.options);
  }

  getEventsCategory(): Observable<any> {
    return this._http.get('/eventsCategory').map(res => res.json());
  }
  addEventsCategory(eventsCategory): Observable<any> {
    return this._http.post('/eventsCategory', JSON.stringify(eventsCategory), this.options);
  }
  editEventsCategory(eventsCategory): Observable<any> {
    return this._http.put(`/eventsCategory/${eventsCategory._id}`, JSON.stringify(eventsCategory), this.options);
  }
  deleteEventsCategory(eventsCategory): Observable<any> {
    return this._http.delete(`/eventsCategory/${eventsCategory._id}`, this.options);
  }

  getConsultingCategory(): Observable<any> {
    return this._http.get('/consultingsCategory').map(res => res.json());
  }
  addConsultingCategory(consultingCategory): Observable<any> {
    return this._http.post('/consultingsCategory', JSON.stringify(consultingCategory), this.options);
  }
  editConsultingCategory(consultingCategory): Observable<any> {
    return this._http.put(`/consultingsCategory/${consultingCategory._id}`, JSON.stringify(consultingCategory), this.options);
  }
  deleteConsultingCategory(consultingCategory): Observable<any> {
    return this._http.delete(`/consultingsCategory/${consultingCategory._id}`, this.options);
  }

  getNews(): Observable<any> {
    return this._http.get('/news').map(res => res.json());
  }
  addNews(event): Observable<any> {
    return this._http.post('/news', JSON.stringify(event), this.options);
  }
  editNews(event): Observable<any> {
    return this._http.put(`/news/${event._id}`, JSON.stringify(event), this.options);
  }
  deleteNews(event): Observable<any> {
    return this._http.delete(`/news/${event._id}`, this.options);
  }

  getTrainers(): Observable<any> {
    return this._http.get('/trainers').map(res => res.json());
  }
  addTrainer(event): Observable<any> {
    return this._http.post('/trainers', JSON.stringify(event), this.options);
  }
  editTrainer(event): Observable<any> {
    return this._http.put(`/trainers/${event._id}`, JSON.stringify(event), this.options);
  }
  deleteTrainer(event): Observable<any> {
    return this._http.delete(`/trainers/${event._id}`, this.options);
  }
}
