import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, EventPost } from '../interfaces/event';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  baseUrl: string = 'https://xzf89rcs.directus.app/items/plants';

  constructor(private httpClient: HttpClient) {}

  public getPlant(id: number): Observable<Event> {
    return this.httpClient
      .get<Event>(`${this.baseUrl}/${id}?fields=*.*`)
      .pipe(shareReplay());
  }

  public getPlants(): Observable<Event[]> {
    return this.httpClient
      .get<Event[]>(`${this.baseUrl}?fields=*.*`)
      .pipe(shareReplay());
  }
}
