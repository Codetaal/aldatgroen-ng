import { EventService } from './../../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../services/plant.service';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/app/interfaces/plant';
import { Event } from 'src/app/interfaces/event';
import { environment } from 'src/environments/environment';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
})
export class PlantDetailsComponent implements OnInit {
  id!: number;
  plant!: Plant;
  events!: Event[];
  today!: string;

  constructor(
    private plantService: PlantService,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {
    // this.today = '2022-05-18T00:00:00.000';
    this.today = dayjs().format();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.plantService.getPlant(this.id).subscribe((response: any) => {
      this.plant = response.data;

      this.createRecurringEvents();
      this.sortEventsByStartDate();
    });
  }

  createRecurringEvents(): void {
    this.events = [];

    this.plant.events.forEach((event, index) => {
      const eventDate = dayjs(event.start_date)
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0);

      // Determine first date
      const amount = Math.floor(
        dayjs(this.today).diff(eventDate, 'day') / parseInt(event.repeat)
      );

      // Manipulate start_date if it takes place before today
      // if (dayjs(eventDate).isBefore(dayjs(this.today))) {
      //   event.start_date = dayjs(event.start_date).add(amount, 'day').format();
      // }

      for (let n = 0; n <= amount; n++) {
        const newEvent = { ...event };

        newEvent.start_date = dayjs(newEvent.start_date)
          .add(parseInt(newEvent.repeat) * n, 'day')
          .format();
        newEvent.cloneRefIndex = index;

        if (this.isToday(newEvent)) {
          console.log(newEvent);
        }

        this.events.push(newEvent);
      }
    });
  }

  sortEventsByStartDate() {
    this.events.sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );
  }

  isToday(event: Event): boolean {
    if (dayjs(this.today).isSame(dayjs(event.start_date), 'day')) {
      return true;
    }

    return false;
  }
}
