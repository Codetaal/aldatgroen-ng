import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private httpClient: HttpClient) {}

  public getPlants(): Observable<any> {
    const endpoint: string = 'plants';

    return this.httpClient.get(`${environment.apiEndpoint}${endpoint}`);
  }

  public getPlant(id: number): Observable<Object> {
    const endpoint: string = 'plant';

    // return this.httpClient.get(`${environment.apiEndpoint}${endpoint}/${id}`);
    return this.httpClient.get(`${environment.apiEndpoint}${endpoint}`);
  }
}
