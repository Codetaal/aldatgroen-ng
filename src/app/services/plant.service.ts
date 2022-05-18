import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import {
  PlantResponseInterface,
  PlantsResponseInterface,
} from '../interfaces/plant';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  baseUrl: string = 'https://xzf89rcs.directus.app/items/plants';

  constructor(private httpClient: HttpClient) {}

  public getPlant(id: number): Observable<PlantResponseInterface> {
    return this.httpClient
      .get<PlantResponseInterface>(`${this.baseUrl}/${id}?fields=*.*`)
      .pipe(shareReplay());
  }

  public getPlants(): Observable<PlantsResponseInterface> {
    return this.httpClient
      .get<PlantsResponseInterface>(`${this.baseUrl}?fields=*.*`)
      .pipe(shareReplay());
  }
}
