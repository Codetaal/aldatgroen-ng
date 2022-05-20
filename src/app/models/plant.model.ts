import { MessageTransform } from '../interfaces/message';
import { MessageModel } from './message.model';
// import { PlantResponse } from '../interfaces/plant';

export class PlantModel {
  public sort: string;

  constructor(
    public id: number,
    public name: string,
    public secondary_name: string,
    public photo: {
      id: string;
    },
    public description: string,
    public date_created: string,
    private messages: MessageTransform[]
  ) {
    this.sort =
      this.getLatestMessage().date_created !== undefined
        ? this.getLatestMessage().date_created
        : '2022-01-01';
  }

  getPhoto(width: number = 56, quality: number = 80): string {
    return this.hasPhoto()
      ? `https://xzf89rcs.directus.app/assets/${this.photo.id}?width=${width}&quality=${quality}`
      : '';
  }

  hasPhoto(): boolean {
    return this.photo !== null ? true : false;
  }

  getName(): string {
    return this.secondary_name || this.name;
  }

  getLatestMessage(): any {
    const newMessages: MessageModel[] = this.getMessages();
    newMessages.reverse();

    return newMessages[0];
  }

  hasMessages(): boolean {
    return this.messages.length > 0 ? true : false;
  }

  getMessages(): any {
    return this.hasMessages()
      ? this.messages.map((message: MessageTransform) => {
          return new MessageModel(
            message.id,
            message.content,
            message.date_created
          );
        })
      : [new MessageModel()];
  }

  getMessageCount(): number {
    return this.messages.length;
  }
}
