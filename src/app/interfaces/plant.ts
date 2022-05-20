import { Event } from 'src/app/interfaces/event';
import { MessageResponse, MessageTransform } from 'src/app/interfaces/message';

export interface PlantResponse {
  id: number;
  name: string;
  secondary_name: string;
  photo: {
    id: string;
  };
  description: string;
  date_created: string;
  // events: Event[];
  messages: MessageResponse[];
}

export interface PlantResponseInterface {
  data: PlantResponse;
}

export interface PlantsResponseInterface {
  data: PlantResponse[];
}

export interface PlantTransformInterface {
  id: number;
  name: string;
  secondary_name: string;
  photo: {
    small: string;
    medium: string;
  };
  date_created: string;
  sort: string;
  messages: MessageTransform[];
  // messages: Array<{
  //   id: number;
  //   content: string;
  //   date_created: string;
  // }>;

  getName: () => string;
  getPhoto: (width: number, quality: number) => string;
  getLatestMessage: () => MessageTransform;
  getMessageCount: () => number;
  hasNewMessage: () => boolean;
}
