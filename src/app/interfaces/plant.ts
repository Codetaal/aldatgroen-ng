import { Event } from 'src/app/interfaces/event';
import { Message } from 'src/app/interfaces/message';

export interface Plant {
  id: number;
  name: string;
  secondary_name: string;
  description: string;
  events: Event[];
  messages: Message[];
  sort: string;
  // createdAt: string;
  // updatesAt: string;
}

// export interface PlantResponse {
//   id: number;
//   name: string;
//   secondary_name: string;
//   description: string;
//   events: Event[];
//   messages: Message[];
//   // createdAt: string;
//   // updatesAt: string;
// }
