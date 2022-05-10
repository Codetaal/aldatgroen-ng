import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { faunaDbClient, faunaQuery } from './../globals';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient) {}

  public getEvent(id: number): Observable<Event> {
    return this.httpClient.get<Event>(
      `https://xzf89rcs.directus.app/items/events/${id}`
    );
  }

  public getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(
      `https://xzf89rcs.directus.app/items/events`
    );
  }
}
