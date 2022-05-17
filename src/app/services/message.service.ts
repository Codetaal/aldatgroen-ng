import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl: string = 'https://xzf89rcs.directus.app/items/messages';

  constructor(private httpClient: HttpClient) {}

  public getMessages(): Observable<Event[]> {
    return this.httpClient
      .get<Event[]>(`${this.baseUrl}?fields=*.*`)
      .pipe(shareReplay());
  }
}
