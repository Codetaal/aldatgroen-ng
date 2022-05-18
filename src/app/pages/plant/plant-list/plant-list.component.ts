import {
  PlantsResponseInterface,
  PlantTransformInterface,
} from 'src/app/interfaces/plant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from '../../../services/plant.service';
import { MessageResponse, MessageTransform } from 'src/app/interfaces/message';

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
        this.transform(response);
      });
  }

  transform(response: PlantsResponseInterface) {
    response.data.forEach((plant) => {
      const newPlant: PlantTransformInterface = {
        sort: '',
        name: plant.name,
        secondary_name: plant.secondary_name,

        messages: [],

        latestMessage: (): MessageResponse => {
          return plant.messages[0];
        },
        countMessages: (): number => {
          return plant.messages.length;
        },
      };

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

      this.plants.push(newPlant);
    });

    this.plants.sort(
      (a, b) => new Date(b.sort).getTime() - new Date(a.sort).getTime()
    );

    console.log(this.plants);
  }

  routePlantDetails(id: number) {
    this.router.navigate(['plants', id]);
  }
}
