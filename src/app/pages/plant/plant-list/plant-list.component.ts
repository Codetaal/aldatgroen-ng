import {
  PlantsResponseInterface,
  PlantTransformInterface,
} from 'src/app/interfaces/plant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from '../../../services/plant.service';
import { MessageResponse, MessageTransform } from 'src/app/interfaces/message';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
})
export class PlantListComponent implements OnInit {
  plantsResponse: PlantsResponseInterface = { data: [] };
  plants: PlantTransformInterface[] = [];

  constructor(private plantService: PlantService, private router: Router) {}

  ngOnInit(): void {
    this.plantService
      .getPlants()
      .subscribe((response: PlantsResponseInterface) => {
        console.log(response);
        this.transform(response);
      });
  }

  transform(response: PlantsResponseInterface) {
    response.data.forEach((plant) => {
      const newPlant: PlantTransformInterface = {
        sort: '',
        id: plant.id,
        name: plant.name,
        secondary_name: plant.secondary_name,
        date_created: plant.date_created,
        photo: {
          small: '',
          medium: '',
        },
        messages: [],
        latestMessage: (): MessageResponse => {
          return plant.messages[0];
        },
        countMessages: (): number => {
          return plant.messages.length;
        },
      };

      console.log(plant.photo);

      if (plant.photo !== null) {
        newPlant.photo.small = `https://xzf89rcs.directus.app/assets/${plant.photo.id}?width=40&quality=80`;
        newPlant.photo.medium = `https://xzf89rcs.directus.app/assets/${plant.photo.id}?width=56&quality=80`;
      }

      plant.messages.forEach((message) => {
        const newMessage: MessageTransform = {
          id: message.id,
          content: message.content,
        };
        newPlant.messages.push(newMessage);
      });

      if (plant.messages.length) {
        const newMessages = plant.messages;
        newMessages.reverse();

        newPlant.sort = newMessages[0].date_created;
      }

      newPlant.date_created = dayjs(newPlant.date_created).isSame(
        dayjs('2022-05-18')
      )
        ? dayjs(newPlant.date_created).format('MM/DD/YYYY')
        : dayjs(newPlant.date_created).format('h:mm a');

      this.plants.push(newPlant);
    });

    this.plants.sort(
      (a, b) => new Date(b.sort).getTime() - new Date(a.sort).getTime()
    );

    // console.log(this.plants);
  }

  routePlantDetails(id: number) {
    this.router.navigate(['plants', id]);
  }
}
