import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../services/plant.service';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/interfaces/plant';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
})
export class PlantDetailsComponent implements OnInit {
  id!: number;
  plant!: Plant;

  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.plantService.getPlant(this.id).then((res: any) => {
      this.plant = res.data;
      this.plant.id = res.ref.id;
    });
  }
}
