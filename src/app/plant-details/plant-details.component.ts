import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
})
export class PlantDetailsComponent implements OnInit {
  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
