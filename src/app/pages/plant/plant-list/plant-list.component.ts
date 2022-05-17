import { Plant } from 'src/app/interfaces/plant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from '../../../services/plant.service';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
})
export class PlantListComponent implements OnInit {
  plants!: Plant[];
  // plants!: new MyPlant();

  constructor(private plantService: PlantService, private router: Router) {}

  ngOnInit(): void {
    this.plantService.getPlants().subscribe((response: any) => {
      this.plants = response.data;
      this.sortPlants(this.plants);
      // console.log(this.plants);
      // this.getLatestMessage(this.plants[0]);
    });
  }

  sortPlants(plants: Plant[]): void {
    const newPlants = plants;

    newPlants.forEach((plant: Plant) => {
      const newMessages = plant.messages;

      if (newMessages.length) {
        newMessages.sort(
          (a, b) =>
            new Date(a.date_created).getTime() -
            new Date(b.date_created).getTime()
        );

        plant.sort = newMessages[0].date_created;
      }
    });

    plants.sort(
      (a, b) => new Date(b.sort).getTime() - new Date(a.sort).getTime()
    );
  }

  // getLatestMessage(plant: Plant): Message {
  //   const messages = plant.messages;
  //   if (messages.length) {
  //     messages.sort(
  //       (a, b) =>
  //         new Date(a.date_created).getTime() -
  //         new Date(b.date_created).getTime()
  //     );
  //   }
  //   return messages[0];
  // }

  routePlantDetails(id: number) {
    this.router.navigate(['plants', id]);
  }
}
