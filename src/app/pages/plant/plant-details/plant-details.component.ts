import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../services/plant.service';
import { ActivatedRoute } from '@angular/router';
import {
  PlantResponseInterface,
  PlantTransformInterface,
} from 'src/app/interfaces/plant';
import { Event } from 'src/app/interfaces/event';
import { MessageResponse, MessageTransform } from 'src/app/interfaces/message';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
})
export class PlantDetailsComponent implements OnInit {
  id!: number;
  plant!: PlantTransformInterface;
  // events!: Event[];
  today!: string;

  constructor(
    private plantService: PlantService,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {
    // this.today = '2022-05-18T00:00:00.000';
    this.today = dayjs().format();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.plantService
      .getPlant(this.id)
      .subscribe((response: PlantResponseInterface) => {
        this.plant = this.plantService.transform(response.data);
      });
  }

  // transform(response: PlantResponseInterface) {
  //   const plant = response.data;
  //   const newPlant: PlantTransformInterface = {
  //     sort: '',
  //     id: plant.id,
  //     name: plant.name,
  //     secondary_name: plant.secondary_name,
  //     date_created: plant.date_created,
  //     photo: {
  //       small: '',
  //       medium: '',
  //     },
  //     messages: [],
  //     latestMessage: (): any => {
  //       return plant.messages.length ? plant.messages[0] : {};
  //     },
  //     countMessages: (): number => {
  //       return plant.messages.length;
  //     },
  //   };

  //   if (plant.photo !== null) {
  //     newPlant.photo.small = `https://xzf89rcs.directus.app/assets/${plant.photo.id}?width=40&quality=80`;
  //     newPlant.photo.medium = `https://xzf89rcs.directus.app/assets/${plant.photo.id}?width=56&quality=80`;
  //   }

  //   plant.messages.forEach((message) => {
  //     const newMessage: MessageTransform = {
  //       id: message.id,
  //       content: message.content,
  //       date_created: message.date_created,
  //     };

  //     newMessage.date_created = dayjs(newMessage.date_created).isSame(
  //       dayjs('2022-05-18')
  //     )
  //       ? dayjs(newMessage.date_created).format('MM/DD/YYYY')
  //       : dayjs(newMessage.date_created).format('h:mm a');

  //     newPlant.messages.push(newMessage);
  //   });

  //   if (plant.messages.length) {
  //     const newMessages = plant.messages;
  //     newMessages.reverse();

  //     newPlant.sort = newMessages[0].date_created;
  //   }

  //   this.plant = newPlant;
  // }
}
