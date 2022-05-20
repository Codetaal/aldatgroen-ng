export interface MessageResponse {
  id: number;
  plant_id: number;
  user_id: number;
  content: string;
  published_date: string;
  date_created: string;
  date_updated: string;
}

export interface MessageTransform {
  id: number;
  user_id: number;
  content: string;
  date_created: string;
  published_date: string;
}

export interface MessageGroupsTransform {
  day: string;
  messages?: MessageTransform[];
}
