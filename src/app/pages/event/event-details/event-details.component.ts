import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/interfaces/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  id!: number;
  event!: Event;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.eventService.getEvent(this.id).then((res: any) => {
      this.event = res.data;
      this.event.id = res.ref.id;
    });
  }
}
