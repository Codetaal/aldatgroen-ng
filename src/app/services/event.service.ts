import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient) {}

  public getEvents(): Observable<any> {
    const endpoint: string = 'events';

    return this.httpClient.get(`${environment.apiEndpoint}${endpoint}`);
  }

  public getEvent(id: number): Observable<Object> {
    const endpoint: string = 'event';

    // return this.httpClient.get(`${environment.apiEndpoint}${endpoint}/${id}`);
    return this.httpClient.get(`${environment.apiEndpoint}${endpoint}`);
  }
}
