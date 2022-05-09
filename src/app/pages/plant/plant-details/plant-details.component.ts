import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../services/plant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
})
export class PlantDetailsComponent implements OnInit {
  id!: any;
  plant!: any;

  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.plantService.getPlant(this.id).then((res: any) => {
      this.plant = res;
      console.log(this.plant);
    });
  }
}
