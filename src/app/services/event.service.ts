import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient) {}

  public getEvents(): Observable<Event[]> {
    const endpoint: string = 'events';

    return this.httpClient.get<Event[]>(
      `${environment.apiEndpoint}${endpoint}`
    );
  }

  public getEvent(id: number): Observable<Event> {
    const endpoint: string = 'event';

    // return this.httpClient.get(`${environment.apiEndpoint}${endpoint}/${id}`);
    return this.httpClient.get<Event>(`${environment.apiEndpoint}${endpoint}`);
  }
}
