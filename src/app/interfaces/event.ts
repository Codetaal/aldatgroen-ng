export interface Event {
  id: number;
  plant_id: number;
  title: string;
  description: string;
  start_date: string;
  repeat: string;
  reminder: string;
  date_created: string;
  date_updated: string;
  cloneRefIndex: number;
}
export interface EventPost {
  title: string;
  description: string;
  start_date: string;
  repeat: string;
  reminder: string;
}
