import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, EventPost } from '../interfaces/event';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  baseUrl: string = 'https://xzf89rcs.directus.app/items/events';

  constructor(private httpClient: HttpClient) {}

  public getEvent(id: number): Observable<Event> {
    return this.httpClient
      .get<Event>(`${this.baseUrl}/${id}?fields=*.*.*`)
      .pipe(shareReplay());
  }

  public getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.baseUrl}`).pipe(shareReplay());
  }

  public getEventsByPlantId(id: number): Observable<Event[]> {
    return this.httpClient
      .get<Event[]>(`${this.baseUrl}?filter[plant_id][_eq]=${id}`)
      .pipe(shareReplay());
  }

  public updateEvent(event: Event): Observable<Event[]> {
    const headers = { 'content-type': 'application/json' };

    const postObj: EventPost = {
      title: event.title,
      description: event.description,
      start_date: event.start_date,
      repeat: event.repeat,
      reminder: event.reminder,
    };

    const body = JSON.stringify(postObj);

    console.log('body', body);

    return this.httpClient
      .patch<Event[]>(`${this.baseUrl}/${event.id}`, body, {
        headers: headers,
      })
      .pipe(shareReplay());
  }

  public createEvent(event: Event): Observable<Event[]> {
    const headers = { 'content-type': 'application/json' };

    const postObj: EventPost = {
      title: event.title,
      description: event.description,
      start_date: event.start_date,
      repeat: event.repeat,
      reminder: event.reminder,
    };

    const body = JSON.stringify(postObj);

    return this.httpClient
      .post<Event[]>(`${this.baseUrl}`, body, {
        headers: headers,
      })
      .pipe(shareReplay());
  }
}
