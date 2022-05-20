import {
  PlantsResponseInterface,
  PlantTransformInterface,
} from 'src/app/interfaces/plant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from '../../../services/plant.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
})
export class PlantListComponent implements OnInit {
  plants: PlantTransformInterface[] = [];

  constructor(private plantService: PlantService, private router: Router) {}

  ngOnInit(): void {
    this.plantService
      .getPlants()
      .subscribe((response: PlantsResponseInterface) => {
        response.data.forEach((plant) => {
          this.plants.push(this.plantService.transform(plant));
        });

        this.sort();
      });
  }

  sort(): void {
    this.plants.sort((a, b): any => {
      let dateA: string = a.sort;
      let dateB: string = b.sort;

      if (dateA === '') {
        dateA = '2000-01-01';
      }
      if (dateB === '') {
        dateB = '2000-01-01';
      }

      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  }

  routePlantDetails(id: number) {
    this.router.navigate(['plants', id]);
  }
}
