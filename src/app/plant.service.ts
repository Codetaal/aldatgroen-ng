import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  public baseUrl = 'http://localhost:3000/plants';

  constructor(private httpClient: HttpClient) {}

  public getPlants(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  public getPlant(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
}
