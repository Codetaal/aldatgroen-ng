import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { MessageTransform, MessageResponse } from '../interfaces/message';
import {
  PlantResponseInterface,
  PlantsResponseInterface,
  PlantTransformInterface,
  PlantResponse,
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

  public transform(plant: PlantResponse): any {
    const newResponse: PlantTransformInterface = {
      id: plant.id,
      name: plant.name,
      secondary_name: plant.secondary_name,
      date_created: plant.date_created,
      photo: {
        small: '',
        medium: '',
      },
      messages: plant.messages,
      sort: '',

      getName: (): string => {
        return plant.secondary_name || plant.name;
      },
      getPhoto: (width: number = 56, quality: number = 80): string => {
        if (plant.photo !== null) {
          return `https://xzf89rcs.directus.app/assets/${plant.photo.id}?width=${width}&quality=${quality}`;
        } else {
          return '';
        }
      },
      getLatestMessage: (): any => {
        // TODO: sort by date
        return plant.messages[plant.messages.length - 1];
      },
      getMessageCount: (): number => {
        return plant.messages.length;
      },
      hasNewMessage: (): boolean => {
        return plant.messages.length ? true : false;
      },
    };

    if (plant.photo !== null) {
      newResponse.photo.small = `https://xzf89rcs.directus.app/assets/${plant.photo.id}?width=40&quality=80`;
      newResponse.photo.medium = `https://xzf89rcs.directus.app/assets/${plant.photo.id}?width=56&quality=80`;
    }

    if (newResponse.getMessageCount() > 0) {
      newResponse.sort = newResponse.getLatestMessage().date_created;
    }
    return newResponse;
  }
}
