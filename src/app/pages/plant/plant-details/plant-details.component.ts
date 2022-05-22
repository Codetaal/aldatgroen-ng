import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../services/plant.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PlantResponseInterface,
  PlantTransformInterface,
} from 'src/app/interfaces/plant';
import { Event } from 'src/app/interfaces/event';
import { MessageResponse, MessageTransform } from 'src/app/interfaces/message';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
})
export class PlantDetailsComponent implements OnInit {
  id!: number;
  plant!: PlantTransformInterface;
  // events!: Event[];
  today!: string;

  constructor(
    private plantService: PlantService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.today = '2022-05-18T00:00:00.000';
    this.today = dayjs().format();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.plantService
      .getPlant(this.id)
      .subscribe((response: PlantResponseInterface) => {
        this.plant = this.plantService.transform(response.data);
        // console.log('messages', this.plant.messages);
      });
  }

  routePlantList() {
    this.router.navigate(['plants']);
  }
}
