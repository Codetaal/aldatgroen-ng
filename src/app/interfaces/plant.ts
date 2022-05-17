import { Event } from 'src/app/interfaces/event';
export interface Plant {
  id: number;
  name: string;
  secondary_name: string;
  description: string;
  events: Event[];
  createdAt: string;
  updatesAt: string;
}
