import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, EventPost } from '../interfaces/event';
import { shareReplay } from 'rxjs/operators';
import { Plant } from '../interfaces/plant';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  baseUrl: string = 'https://xzf89rcs.directus.app/items/plants';

  constructor(private httpClient: HttpClient) {}

  public getPlant(id: number): Observable<Plant> {
    return this.httpClient
      .get<Plant>(`${this.baseUrl}/${id}?fields=*.*`)
      .pipe(shareReplay());
  }

  public getPlants(): Observable<Plant[]> {
    return this.httpClient
      .get<Plant[]>(`${this.baseUrl}?fields=*.*`)
      .pipe(shareReplay());
  }
}
