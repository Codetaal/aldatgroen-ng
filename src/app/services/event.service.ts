import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faunaDbClient, faunaQuery } from './../globals';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient) {}

  public getEvents(): Promise<void> {
    return faunaDbClient
      .query(
        faunaQuery.Map(
          faunaQuery.Paginate(faunaQuery.Match(faunaQuery.Index('all_tasks'))),
          faunaQuery.Lambda((x) => faunaQuery.Get(x))
        )
      )
      .then((res: any) => res)
      .catch((err) => console.error(err));
  }

  public getEvent(id: number): Promise<void> {
    return faunaDbClient
      .query(faunaQuery.Get(faunaQuery.Ref(faunaQuery.Collection('tasks'), id)))
      .then((res: any) => res)
      .catch((err) => console.error(err));
  }
}
