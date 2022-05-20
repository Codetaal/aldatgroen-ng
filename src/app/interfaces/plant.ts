import {
  MessageResponse,
  MessageTransform,
  MessageGroupsTransform,
} from 'src/app/interfaces/message';

export interface PlantResponse {
  id: number;
  name: string;
  secondary_name: string;
  photo: {
    id: string;
  };
  description: string;
  date_created: string;
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
    id: string;
  };
  date_created: string;
  sort: string;
  messages: MessageTransform[];
  groupedMessages: MessageGroupsTransform[];
  // messages: Array<{
  //   id: number;
  //   content: string;
  //   date_created: string;
  // }>;

  getName: () => string;
  getPhoto: (width: number, quality: number) => string;
  getLatestMessage: () => MessageTransform;
  hasPhoto: () => boolean;
  getMessageCount: () => number;
  hasNewMessage: () => boolean;
}
