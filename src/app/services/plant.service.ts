import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faunaDbClient, faunaQuery } from './../globals';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private httpClient: HttpClient) {}

  public getPlants(): Promise<void> {
    return faunaDbClient
      .query(
        faunaQuery.Map(
          faunaQuery.Paginate(faunaQuery.Match(faunaQuery.Index('all_plants'))),
          faunaQuery.Lambda((x) => faunaQuery.Get(x))
        )
      )
      .then((res: any) => res)
      .catch((err) => console.error(err));
  }

  public getPlant(id: number): Promise<void> {
    return faunaDbClient
      .query(
        faunaQuery.Get(faunaQuery.Ref(faunaQuery.Collection('plants'), id))
      )
      .then((res: any) => res)
      .catch((err) => console.error(err));
  }
}
