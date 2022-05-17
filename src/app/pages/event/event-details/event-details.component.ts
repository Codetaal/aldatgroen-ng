import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/interfaces/event';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  id!: number;
  event!: Event;
  postponeAmount!: number;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.eventService.getEvent(this.id).subscribe((response: any) => {
      this.event = response.data;
    });
  }

  postpone(event: Event): void {
    if (this.postponeAmount !== undefined) {
      event.start_date = dayjs(event.start_date)
        .add(this.postponeAmount, 'day')
        .format();

      this.eventService.updateEvent(event).subscribe((response: any) => {
        this.event = response.data;
      });
    }
  }
}
