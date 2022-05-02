import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plant } from '../plant';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
})
export class PlantListComponent implements OnInit {
  plants!: Plant[];

  constructor(private plantService: PlantService, private router: Router) {}

  ngOnInit(): void {
    this.plantService.getPlants().subscribe((data) => {
      this.plants = data;
    });
  }

  routePlantDetails(id: number) {
    this.router.navigate(['plant', id]);
    console.log(id);
  }
}
