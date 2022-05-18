import { Event } from 'src/app/interfaces/event';
import { MessageResponse, MessageTransform } from 'src/app/interfaces/message';

export interface PlantResponse {
  id: number;
  name: string;
  secondary_name: string;
  description: string;
  events: Event[];
  messages: MessageResponse[];
}

export interface PlantResponseInterface {
  data: PlantResponse;
}

export interface PlantsResponseInterface {
  data: PlantResponse[];
}

export interface PlantTransformInterface {
  name: string;
  secondary_name: string;
  sort: string;

  messages: MessageTransform[];

  latestMessage: () => MessageTransform;
  countMessages: () => number;
}
