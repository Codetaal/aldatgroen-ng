import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
// import 'dayjs/locale/nl-nl'; // import locale
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import {
  MessageGroupsTransform,
  MessageTransform,
} from '../interfaces/message';
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
    plant.messages.sort((a, b): any => {
      let dateA: string = a.published_date;
      let dateB: string = b.published_date;

      if (dateA === '') {
        dateA = '2000-01-01';
      }
      if (dateB === '') {
        dateB = '2000-01-01';
      }

      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    plant.messages.reverse();

    const newResponse: PlantTransformInterface = {
      id: plant.id,
      name: plant.name,
      secondary_name: plant.secondary_name,
      date_created: plant.date_created,
      photo: {
        id: '',
      },
      // messages: plant.messages,
      groupedMessages: [],
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
      hasPhoto: (): boolean => {
        return plant.photo !== null ? true : false;
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

    if (newResponse.getMessageCount() > 0) {
      newResponse.sort = newResponse.getLatestMessage().published_date;
    }

    // Group messages
    let messageGroup: MessageTransform[] = [];
    plant.messages.forEach((message, index) => {
      const nextMessage =
        plant.messages[index < plant.messages.length - 1 ? index + 1 : index];

      const newMessage: MessageTransform = {
        id: message.id,
        user_id: message.user_id,
        content: message.content,
        date_created: message.date_created,
        published_date: message.published_date,
        // hasPhoto: (): boolean => {},
      };

      messageGroup.push(newMessage);

      if (
        !dayjs(message.published_date, 'YYYY-MM-DD').isSame(
          dayjs(nextMessage.published_date, 'YYYY-MM-DD'),
          'day'
        ) ||
        index >= plant.messages.length - 1
      ) {
        const newGroupMessages: MessageGroupsTransform = {
          day: message.published_date,
          messages: messageGroup,
        };
        newResponse.groupedMessages.push(newGroupMessages);

        messageGroup = [];
      }
    });

    return newResponse;
  }
}
