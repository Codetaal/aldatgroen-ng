import * as dayjs from 'dayjs';

export class MessageModel {
  constructor(
    public id?: number,
    public content?: string,
    public date_created?: string
  ) {}

  getDate(): string {
    return dayjs(this.date_created).isSame(dayjs('2022-05-20'))
      ? dayjs(this.date_created).format('MM/DD/YYYY')
      : dayjs(this.date_created).format('h:mm a');
  }
}
