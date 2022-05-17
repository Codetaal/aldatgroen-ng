import { Plant } from 'src/app/interfaces/plant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from '../../../services/plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
})
export class PlantListComponent implements OnInit {
  plants!: Plant[];

  constructor(private plantService: PlantService, private router: Router) {}

  ngOnInit(): void {
    this.plantService.getPlants().subscribe((response: any) => {
      this.plants = response.data;
    });
  }

  routePlantDetails(id: number) {
    this.router.navigate(['plants', id]);
  }
}
