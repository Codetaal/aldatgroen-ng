import { Plant } from './../../../interfaces/plant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from '../../../services/plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
})
export class PlantListComponent implements OnInit {
  plants!: any;

  constructor(private plantService: PlantService, private router: Router) {}

  ngOnInit(): void {
    this.plantService.getPlants().then((res: any) => {
      this.plants = res.data;
      console.log(this.plants);
    });
  }

  routePlantDetails(id: number) {
    this.router.navigate(['plants', id]);
  }
}
